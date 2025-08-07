import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Welcome to{" "}
                        <span className="text-blue-600">AuthApp</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        A secure and modern authentication system built with the
                        latest technologies. Experience seamless user management
                        with email verification, secure sessions, and more.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3 text-lg"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            className="px-8 py-3 text-lg bg-gray-600 hover:bg-gray-700"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Secure Authentication
                        </h3>
                        <p className="text-gray-600">
                            Industry-standard security with email verification,
                            secure sessions, and encrypted data storage.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Fast Performance
                        </h3>
                        <p className="text-gray-600">
                            Lightning-fast authentication with optimized backend
                            APIs and modern frontend architecture.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            User Management
                        </h3>
                        <p className="text-gray-600">
                            Complete user lifecycle management with
                            registration, verification, and profile management.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Join thousands of users who trust our secure
                            authentication system.
                        </p>
                        <Button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3 text-lg"
                        >
                            Create Account
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
