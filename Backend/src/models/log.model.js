import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    monitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monitor",
        required: true,
        index: true
    },

    status: {
        type: String,
        enum: ["UP", "DOWN", "DEGRADED"],
        required: true
    },

    statusCode: {
        type: Number
    },

    responseTime: {
        type: Number,
        required: true
    },

    errorMessage: {
        type: String,
        trim: true
    }

    }, {
    timestamps: true
    });

// 🔥 important index
logSchema.index({ monitorId: 1, createdAt: -1 });

const Log = mongoose.model("Log", logSchema);

export default Log;