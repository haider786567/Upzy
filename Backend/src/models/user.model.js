<<<<<<< HEAD
import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
=======
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
>>>>>>> 54a6cc82a5fd3591749f96c5f5bf1e15dd95dbdc
    },
    email: {
        type: String,
        required: true,
<<<<<<< HEAD
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: { enum: ["user", "admin"], default: "user" }
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
=======
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
>>>>>>> 54a6cc82a5fd3591749f96c5f5bf1e15dd95dbdc
