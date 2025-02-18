import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const ResetPasswordCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(new Array(6).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (index, value) => {
        if (/[^0-9]/.test(value)) return;

        let newCode = [...code];
        let inputValues = value.split("");

        for (let i = 0; i < inputValues.length && index + i < 6; i++) {
            newCode[index + i] = inputValues[i];
        }

        setCode(newCode);

        let nextIndex = newCode.findIndex((char) => char === "");
        if (nextIndex !== -1) {
            inputsRef.current[nextIndex].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            let newCode = [...code];
            if (!newCode[index] && index > 0) {
                newCode[index - 1] = "";
                inputsRef.current[index - 1].focus();
            } else {
                newCode[index] = "";
            }
            setCode(newCode);
        }
    };

    const handleClick = () => {
        let firstEmpty = code.findIndex((char) => char === "");
        if (firstEmpty !== -1) {
            inputsRef.current[firstEmpty].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.join("").length === 6) {
            navigate("/restablecercontrasena/codigo/verificar");
        }
    };
    return (
        <div className="flex items-center justify-center pt-8 py-2 px-4 gap-6 max-w-lg m-auto h-screen">
            <button
                onClick={() => navigate("/recuperarcontrasena")}
                className="flex gap-1 items-center absolute top-2 left-2 bg-primary text-white p-2 rounded-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(255,255,255,1)"
                    className="w-5 h-5"
                >
                    <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
                Regresar
            </button>
            <div className="flex flex-col items-center justify-center gap-6 border border-gray-200 shadow-xl rounded-3xl py-10 px-10">

                <header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-24 md:h-30 text-primary"
                    >
                        <path d="M12 2C9.24 2 7 4.24 7 7V10H6C4.34 10 3 11.34 3 13V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V13C21 11.34 19.66 10 18 10H17V7C17 4.24 14.76 2 12 2ZM9 7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V10H9V7ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V13C5 12.45 5.45 12 6 12H18C18.55 12 19 12.45 19 13V19Z"></path>
                    </svg>
                </header>

                <main>
                    <section className="flex flex-col gap-8 text-center">
                        <h1 className="text-4xl font-bold">Verifica tu código</h1>
                        <p className="text-gray-600">Ingresa el código de 6 dígitos que enviamos a tu correo.</p>

                        <form className="w-full mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex justify-center gap-2">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onClick={handleClick}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        maxLength={1}
                                        className="w-12 h-12 border-3 border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all"
                                onClick={() => navigate("/recuperarcontrasena/nuevacontrasena")}
                            >
                                Verificar código
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ResetPasswordCode;