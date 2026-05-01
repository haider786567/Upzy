import User from "../models/user.model";
import { jwt } from "jsonwebtoken";
import cookies from "cookie-parser";


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false, error: "User with this email already exists" });
        }

        // Create new user
        const newUser = await User.create({ username, email, password });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Set token in HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });

        // return success response with user details (excluding password)
        return res.status(201).json({ message: "User registered successfully", success: true, user: { id: newUser._id, username: newUser.username, email: newUser.email } });

    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", success: false, error: "No user found with this email" });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false, error: "Incorrect password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Set token in HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });

        // Return success response with user details (excluding password)
        return res.status(200).json({ message: "Login successful", success: true, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}