const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative">
            {Icon && (
                <Icon
                    size={16}
                    className="absolute inset-y-0 left-0 ml-3.5 my-auto text-gray-400 pointer-events-none"
                />
            )}
            <input
                className={`${
                    Icon ? "pl-10" : "pl-4"
                } pr-4 py-2 border border-gray-300 text-sm rounded-md w-full focus:ring focus:ring-blue-500 focus:outline-none `}
                {...props}
            />
        </div>
    );
};

export default Input;
