import { useEffect, useState } from "react";
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    const variants = {
        success: {
            container: "bg-green-50 border-green-200 text-green-800",
            icon: CheckCircle,
            iconColor: "text-green-500",
        },
        error: {
            container: "bg-red-50 border-red-200 text-red-800",
            icon: AlertCircle,
            iconColor: "text-red-500",
        },
        info: {
            container: "bg-blue-50 border-blue-200 text-blue-800",
            icon: Info,
            iconColor: "text-blue-500",
        },
        warning: {
            container: "bg-yellow-50 border-yellow-200 text-yellow-800",
            icon: AlertTriangle,
            iconColor: "text-yellow-500",
        },
    };

    const { container, icon: Icon, iconColor } = variants[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
                isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
            }`}
        >
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-80 max-w-md ${container}`}
            >
                <Icon size={20} className={`flex-shrink-0 ${iconColor}`} />
                <p className="flex-1 text-sm font-medium">{message}</p>
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
