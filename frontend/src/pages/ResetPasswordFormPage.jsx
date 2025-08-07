import { LoaderIcon, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPasswordFormPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword.trim()) {
            toast.error("Please enter a new password");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const result = await resetPassword(token, newPassword);
            toast.success(result.message || "Password reset successfully!");
            navigate("/login");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to reset password. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-md bg-white w-full rounded-xl">
            <div className="py-8 px-16">
                <div>
                    <h1 className="text-center font-bold text-xl">
                        <span className="text-blue-600">Set New Password</span>
                    </h1>
                    <p className="text-center text-gray-400 mt-2">
                        Please enter your new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-800 text-sm font-semibold">
                                New Password
                            </h2>
                            <div className="relative">
                                <Input
                                    icon={Lock}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 mr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-800 text-sm font-semibold">
                                Confirm Password
                            </h2>
                            <div className="relative">
                                <Input
                                    icon={Lock}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 mr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>Password must:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                            <li>Be at least 6 characters long</li>
                            <li>
                                Contain both letters and numbers (recommended)
                            </li>
                        </ul>
                    </div>

                    <Button className="mt-6" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <LoaderIcon size={24} className="animate-spin" />
                        ) : (
                            "Reset Password"
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

export default ResetPasswordFormPage;
