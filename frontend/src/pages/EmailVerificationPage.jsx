import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const verifyCode = useCallback(() => {
        const verificationCode = code.join("");
        console.log("Verification code:", verificationCode);
        // TODO: Add API call to verify the code
    }, [code]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        verifyCode();
    };
    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle single character input only
        newCode[index] = value;
        setCode(newCode);

        // Move focus to the next input field if value is entered
        if (value && index < 5) {
            setTimeout(() => {
                if (inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1].focus();
                }
            }, 0);
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const pastedCode = pastedData.slice(0, 6).split("");

        const newCode = [...code];
        for (let i = 0; i < 6; i++) {
            newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);

        // Focus on the last filled input or the first empty one
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;

        setTimeout(() => {
            if (inputRefs.current[focusIndex]) {
                inputRefs.current[focusIndex].focus();
            }
        }, 0);
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            verifyCode();
        }
    }, [code, verifyCode]);
    return (
        <div className="max-w-md bg-white w-full rounded-xl">
            <div className="py-8 px-16">
                <div>
                    <h1 className="text-center font-bold text-xl">
                        <span className="text-blue-600">Verify your email</span>
                    </h1>
                    <p className="text-center text-gray-400 mt-2">
                        Enter the code sent to example@gmail.com
                    </p>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-1 text-center">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    maxLength="1"
                                    type="text"
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    placeholder="..."
                                    className="text-center"
                                />
                            ))}
                        </div>
                    </div>

                    <Button className="mt-6" type="submit">
                        Verify Email
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

export default EmailVerificationPage;
