const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed w-full text-white py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
