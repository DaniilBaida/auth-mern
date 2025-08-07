import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordFormPage from "./pages/ResetPasswordFormPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import RedirectAuthenticatedUser from "./components/RedirectAuthenticatedUser";
import ProtectedRoute from "./components/ProtectedRoute";
import VerificationProtectedRoute from "./components/VerificationProtectedRoute";

function App() {
    const { checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RedirectAuthenticatedUser>
                            <HomePage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <DashboardPage />
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticatedUser>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <LoginPage />
                            </div>
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RedirectAuthenticatedUser>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <RegisterPage />
                            </div>
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <RedirectAuthenticatedUser>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <ResetPassword />
                            </div>
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/reset-password/:token"
                    element={
                        <RedirectAuthenticatedUser>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <ResetPasswordFormPage />
                            </div>
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/verify-email"
                    element={
                        <VerificationProtectedRoute>
                            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                                <EmailVerificationPage />
                            </div>
                        </VerificationProtectedRoute>
                    }
                />
            </Routes>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#fff",
                        color: "#363636",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "12px 16px",
                    },
                    success: {
                        style: {
                            background: "#f0f9ff",
                            color: "#0c4a6e",
                            border: "1px solid #0ea5e9",
                        },
                        iconTheme: {
                            primary: "#0ea5e9",
                            secondary: "#f0f9ff",
                        },
                    },
                    error: {
                        style: {
                            background: "#fef2f2",
                            color: "#991b1b",
                            border: "1px solid #ef4444",
                        },
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fef2f2",
                        },
                    },
                }}
            />
        </>
    );
}

export default App;
