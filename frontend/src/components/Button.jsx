const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 w-full text-white py-2 px-4 rounded-md cursor-pointer text-sm transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
