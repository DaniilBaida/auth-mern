import { LoaderIcon, Lock, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { register, isLoading } = useAuthStore();
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(name, email, password);
            toast.success("Registration successful! Please verify your email.");
            navigate("/verify-email");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };
    return (
        <div className="max-w-md bg-white w-full rounded-xl">
            <div className="py-8 px-16">
                <div>
                    <h1 className="text-center font-bold text-xl">
                        <span className="text-blue-600">Sign Up</span> to Join
                    </h1>
                    <p className="text-center text-gray-400 mt-2">
                        Start to do something across the globe!
                    </p>
                </div>

                <form onSubmit={handleRegister} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-gray-800 text-sm font-semibold ">
                                Name
                            </h2>
                            <Input
                                icon={User}
                                type="text"
                                placeholder="Insert your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                    </div>
                    <Button
                        className="mt-6 cursor-pointer"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoaderIcon size={24} className="animate-spin" />
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
                <p className="text-center text-xs text-gray-400 mt-4">
                    By clicking 'Sign Up' you acknowledge that you have
                    understood and agree to{" "}
                    <Link
                        to={""}
                        className="text-blue-800 cursor-pointer hover:underline transition"
                    >
                        Terms and Conditions{" "}
                    </Link>
                    and{" "}
                    <Link
                        to={""}
                        className="text-blue-800 cursor-pointer hover:underline transition"
                    >
                        Privacy Policy
                    </Link>
                </p>
                <p className="text-center text-xs text-gray-400 mt-4">
                    Already have an account?{" "}
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

export default RegisterPage;
