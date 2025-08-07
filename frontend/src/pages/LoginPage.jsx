import { LoaderIcon, Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, isLoading } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please try again.";
            toast.error(errorMessage);
        }
    };
    return (
        <div className="max-w-md bg-white w-full rounded-xl">
            <div className="py-8 px-16">
                <div>
                    <h1 className="text-center font-bold text-xl">
                        <span className="text-blue-600">Log In</span>
                    </h1>
                    <p className="text-center text-gray-400 mt-2">
                        Start to do something across the globe!
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8">
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
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-800 text-sm font-semibold ">
                                Password
                            </h2>
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Insert your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>{" "}
                    <p className="text-end text-xs text-gray-400 mt-2">
                        <Link
                            to={"/reset-password"}
                            className="text-blue-800 hover:underline cursor-pointer transition"
                        >
                            Forgot Password?
                        </Link>
                    </p>
                    <Button
                        className="mt-6 cursor-pointer"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoaderIcon size={24} className="animate-spin" />
                        ) : (
                            "Log In"
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Dont't have an account?{" "}
                    <Link
                        to={"/register"}
                        className="text-blue-800 hover:underline cursor-pointer transition"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
