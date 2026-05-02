import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ["user", "admin"], 
        default: "user" 
    },

    // ✅ Forgot Password ke liye add karo
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpire: {
        type: Date,
        default: undefined
    }

}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.error('Failed to hash password:', error.message);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (passwordToCheck) {
    return await bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;