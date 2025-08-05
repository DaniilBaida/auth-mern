import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const ResetPassword = () => {
    const [email, setEmail] = useState("");

    const handleResetPassword = (e) => {
        e.preventDefault();
    };
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
                            />
                        </div>
                    </div>

                    <Button className="mt-6" type="submit">
                        Continue
                    </Button>
                </form>

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

export default ResetPassword;
