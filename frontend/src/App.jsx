import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
    return (
        <div className=" min-h-screen flex justify-center items-center bg-gray-100">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/verify-email"
                    element={<EmailVerificationPage />}
                />
            </Routes>
        </div>
    );
}

export default App;
