import { LoaderIcon, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { forgotPassword, isLoading } = useAuthStore();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            const result = await forgotPassword(email);
            toast.success(result.message || "Password reset email sent!");
            setIsSubmitted(true);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to send reset email. Please try again.";
            toast.error(errorMessage);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-md bg-white w-full rounded-xl">
                <div className="py-8 px-16 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="font-bold text-xl mb-2">
                        <span className="text-green-600">Check your email</span>
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We've sent a password reset link to{" "}
                        <span className="font-medium">{email}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Didn't receive the email? Check your spam folder or try
                        again.
                    </p>
                    <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gray-600 hover:bg-gray-700"
                    >
                        Try again
                    </Button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        <Link
                            to={"/login"}
                            className="text-blue-800 hover:underline cursor-pointer transition"
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md bg-white w-full rounded-xl">
            <div className="py-8 px-16">
                <div>
                    <h1 className="text-center font-bold text-xl">
                        <span className="text-blue-600">
                            Reset your password
                        </span>
                    </h1>
                    <p className="text-center text-gray-400 mt-2">
                        We'll send you a reset link to your email
                    </p>
                </div>

                <form onSubmit={handleResetPassword} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-800 text-sm font-semibold ">
                                Email
                            </h2>
                            <Input
                                icon={Mail}
                                type="email"
                                placeholder="Insert your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button className="mt-6" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <LoaderIcon size={24} className="animate-spin" />
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Remember your password?{" "}
                    <Link
                        to={"/login"}
                        className="text-blue-800 hover:underline cursor-pointer transition"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
