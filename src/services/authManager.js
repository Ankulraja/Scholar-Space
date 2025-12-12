import axios from "axios";


const REFRESH_ENDPOINT =
  (process.env.REACT_APP_BASE_URL || "") + "/auth/refreshtoken";

let accessToken = null;
let refreshTimer = null;
let isRefreshing = false;
let refreshPromise = null;
let refreshFailedHandler = null;

const pendingRequests = [];

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    return null;
  }
}

function scheduleRefresh() {
  if (!accessToken) return;
  const decoded = decodeJwt(accessToken);
  if (!decoded || !decoded.exp) return;

  const expiresAt = decoded.exp * 1000; 
  const now = Date.now();
  const msUntilExpiry = expiresAt - now;

  const refreshIn = Math.max(0, msUntilExpiry - 60 * 1000);
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshAccessToken().catch(() => {});
  }, refreshIn);
}

async function refreshAccessToken() {
  if (isRefreshing) return refreshPromise;
  isRefreshing = true;

  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        REFRESH_ENDPOINT,
        {},
        { withCredentials: true }
      );
      if (res?.data?.accessToken) {
        const newToken = res.data.accessToken;
        setToken(newToken);
        pendingRequests.forEach((cb) => cb(null, newToken));
        pendingRequests.length = 0;
        isRefreshing = false;
        refreshPromise = null;
        resolve(newToken);
      } else {
        pendingRequests.forEach((cb) => cb(new Error("No token"), null));
        pendingRequests.length = 0;
        isRefreshing = false;
        refreshPromise = null;
        if (typeof refreshFailedHandler === "function") refreshFailedHandler();
        reject(new Error("No accessToken in refresh response"));
      }
    } catch (err) {
      pendingRequests.forEach((cb) => cb(err, null));
      pendingRequests.length = 0;
      isRefreshing = false;
      refreshPromise = null;
      if (typeof refreshFailedHandler === "function") refreshFailedHandler();
      reject(err);
    }
  });

  return refreshPromise;
}

function addPendingRequest(cb) {
  pendingRequests.push(cb);
}

function setToken(token) {
  console.log("cmg to set token .............")
  accessToken = token;
  if (token) scheduleRefresh();
  else clearToken();
}

function getToken() {
  return accessToken;
}

function clearToken() {
  accessToken = null;
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

function onRefreshFailed(cb) {
  refreshFailedHandler = cb;
}

export default {
  setToken,
  getToken,
  clearToken,
  refreshAccessToken,
  addPendingRequest,
  onRefreshFailed,
};
