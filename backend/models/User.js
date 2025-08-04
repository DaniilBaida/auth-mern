import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: true,
        },
        lastLogin: {
            type: Date,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPassword: {
            token: String,
            expiresAt: Date,
        },
        verification: {
            code: String,
            expiresAt: Date,
        },
    },
    { timestamps: true }
);

export const User = model("User", userSchema);
