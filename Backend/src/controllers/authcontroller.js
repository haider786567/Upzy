import config from "../config/config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import transporter from "../config/emailConfig.js";



const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false, error: "User with this email already exists" });
        }

        const newUser = await User.create({ username, email, password });
        const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: config.NODE_ENV === "production", sameSite: "strict" });

        return res.status(201).json({ message: "User registered successfully", success: true, user: { id: newUser._id, username: newUser.username, email: newUser.email } });

    } catch (error) {
        console.error('Error registering user:', error.message);
        next(error); // Pass error to global error handler
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", success: false, error: "No user found with this email" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false, error: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: config.NODE_ENV === "production", sameSite: "strict" });

        return res.status(200).json({ message: "Login successful", success: true, user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        next(error); // Pass error to global error handler
     }
}

const logoutUser = (req, res, next) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: config.NODE_ENV === "production", sameSite: "strict" });
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        next(error);
    }
}

// FORGET PASSWORD — Send user a password reset link
const forgetPassword = async (req, res, next) => {
    console.log("EMAIL:", config.EMAIL);
    console.log("EMAIL_PASS:", config.EMAIL_PASS);
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found with this email", success: false });
        }

        // Generate random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Save token and expiry time to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        // Generate reset link
        const resetLink = `${config.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send email
        await transporter.sendMail({
            from: config.EMAIL,
            to: user.email,
            subject: "Password Reset Request - Upzy",
            html: `
                <h2>Hello ${user.username},</h2>
                <p>You have requested a password reset.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}" style="background:#4F46E5;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
                    Reset Password
                </a>
                <p>This link will expire in <b>1 hour</b>.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });

        return res.status(200).json({ message: "Password reset link sent to email", success: true });

    } catch (error) {
        console.error('Error in forget password:', error.message);
        next(error); // Pass error to global error handler  
    }
}

// RESET PASSWORD — Save new password
const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Find user by token and check if it's expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token", success: false });
        }

        // Set new password (pre-save hook will automatically hash it)
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully", success: true });

    } catch (error) {
        console.error('Error in reset password:', error.message);
        next(error); // Pass error to global error handler
    }
}

export { registerUser, loginUser, logoutUser, forgetPassword, resetPassword };