import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "../components/Button";
import toast from "react-hot-toast";
import {
    LoaderIcon,
    User,
    Mail,
    Shield,
    ShieldCheck,
    LogOut,
} from "lucide-react";

const DashboardPage = () => {
    const { user, logout, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            navigate("/");
        } catch {
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl bg-white w-full rounded-xl shadow-lg">
            <div className="py-8 px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">Welcome to your account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <User className="w-5 h-5 text-blue-600 mr-2" />
                            <h3 className="font-semibold text-gray-800">
                                Profile
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-medium text-gray-800">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium text-gray-800">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            {user?.isVerified ? (
                                <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
                            ) : (
                                <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                            )}
                            <h3 className="font-semibold text-gray-800">
                                Account Status
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span
                                    className={`inline-flex px-3 py-1 text-sm rounded-full ${
                                        user?.isVerified
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {user?.isVerified
                                        ? "Verified"
                                        : "Pending Verification"}
                                </span>
                            </div>
                            {!user?.isVerified && (
                                <div className="mt-3">
                                    <Button
                                        onClick={() =>
                                            navigate("/verify-email")
                                        }
                                        className="bg-yellow-600 hover:bg-yellow-700 text-sm py-2 px-4"
                                    >
                                        <Mail className="w-4 h-4 mr-2" />
                                        Verify Email
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {!user?.isVerified && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                            <Shield className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-yellow-800">
                                    Email Verification Required
                                </h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Please verify your email address to access
                                    all features and ensure account security.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <Button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 px-6 py-2"
                    >
                        {isLoading ? (
                            <LoaderIcon
                                size={20}
                                className="animate-spin mr-2"
                            />
                        ) : (
                            <LogOut size={20} className="mr-2" />
                        )}
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
