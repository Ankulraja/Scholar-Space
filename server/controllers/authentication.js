const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../configurations/mailSender");
require("dotenv").config();
const { passwordUpdated } = require("../templates/passwordUpdate");

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  };
}

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    var result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signUP = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
      resume,
    } = req.body;

    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    if (accountType === "Instructor") {
      if (!resume) {
        return res.status(400).json({
          success: false,
          message: "Please upload resume",
        });
      }
    }

    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Error",
      });
    } else if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP invalid",
      });
    }

    var hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);

    const profileData = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileData._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      resume: resume ? resume : null,
    });

    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Fill All The Fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found, please Enter Valid User Email",
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({
        success: false,
        message: "Password Not Match",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "15d",
      }
    );

    user.password = undefined;

    const cookieOptions = getCookieOptions();

    res.cookie("refreshToken", refreshToken, cookieOptions).status(200).json({
      success: true,
      token: accessToken,
      user,
      message: "Login Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired refresh token" });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {

    const clearOptions = { ...getCookieOptions() };
    delete clearOptions.maxAge;
    res.clearCookie("refreshToken", clearOptions);
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const checkUser = await User.findById({ _id: req.user.id });

    console.log("old password:", oldPassword);
    console.log("user password:", checkUser);

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      checkUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords doesn't match",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      checkUser._id,
      { password: newHashedPassword },
      { new: true }
    );

    try {
      await mailSender(
        updatedUser.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUser.email,
          `${updatedUser.firstName} ${updatedUser.lastName}`
        )
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
