import toast from "react-hot-toast";
import ApiConnector from "../ApiConnector";
import { studentEndpoints } from "../Api";
import rzpLogo from "../../assets/Images/rzp_logo.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastID = toast.loading("Loading....");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay script failed to load");
      return;
    }

    const orderResponse = await ApiConnector(
      "POST",
      studentEndpoints.COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Order Response:", orderResponse);

    if (!orderResponse.data.success) {
      console.error("Order creation failed:", orderResponse.data);
      throw new Error(orderResponse.data.message);
    }

    console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);

    if (!process.env.REACT_APP_RAZORPAY_KEY && !orderResponse.data.data.key) {
      console.error("❌ Razorpay key is missing!");
      toast.error("Payment gateway not configured. Please contact support.");
      return;
    }

    const razorpayKey =
      process.env.REACT_APP_RAZORPAY_KEY || orderResponse.data.data.key;

    const options = {
      key: razorpayKey,
      amount: orderResponse.data.data.amount,
      currency: orderResponse.data.data.currency,
      name: "Scholer-Space",
      description: "Thank you for purchasing the course",
      image: rzpLogo,
      order_id: orderResponse.data.data.id,
      prefill: {
        name: userDetails.firstName || "User",
        email: userDetails.email,
        contact: userDetails.contactNumber || "",
      },
      notes: {
        address: "Scholer-Space",
      },
      theme: {
        color: "#6B21A8",
      },
      // Enable all payment methods explicitly
      method: {
        upi: true,
        netbanking: true,
        card: true,
        wallet: true,
      },
      handler: function (response) {
        console.log("Payment successful:", response);
        //send successful wala mail
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        //verifyPayment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal closed");
        },
      },
    };

    console.log("Opening Razorpay modal with options:", options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
    });
  } catch (error) {
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastID);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await ApiConnector(
      "POST",
      studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderID: response.razorpay_order_id,
        paymentID: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {}
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastID = toast.loading("Loading...");
  try {
    const response = await ApiConnector(
      "POST",
      studentEndpoints.COURSE_VERIFY_API,
      bodyData,
      { Authorization: `Bearer ${token}` }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("payment successful, you are enrolled into the course");
    navigate("/dashboard/enrolled-course");
    dispatch(resetCart());
  } catch (error) {
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastID);
  dispatch(setPaymentLoading(false));
}
