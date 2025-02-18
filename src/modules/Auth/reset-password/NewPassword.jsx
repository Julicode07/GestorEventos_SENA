import Images from "@/assets/img/images.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import ConfirmationResetPassword from "./ConfirmationResetPassword";

const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        console.log("Nueva contraseña establecida:", password);
        navigate("/inicio");
    };

    return (
        <div className="flex items-center justify-center pt-8 py-2 px-4 gap-6 max-w-lg m-auto h-screen">
            <button
                onClick={() => navigate("/recuperarcontrasena/codigo")}
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
                Volver
            </button>
            <div className="flex flex-col items-center justify-center gap-6 border border-gray-200 shadow-xl rounded-3xl py-10 px-10">
                <header>
                    <img
                        src={Images.logoVerde}
                        className="h-24 md:h-30"
                        alt="Logo Blanco SENA"
                    />
                </header>
                <main>
                    <section className="flex flex-col gap-8 text-center">
                        <h1 className="text-4xl font-bold">Crea tu nueva contraseña</h1>
                        <p className="text-gray-600">Ingresa una nueva contraseña y confírmala.</p>
                        <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4">
                            <div className="relative w-full">
                                <input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Nueva contraseña"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400" /> : <EyeFilledIcon className="text-2xl text-default-400" />}
                                </button>
                            </div>
                            <div className="relative w-full">
                                <input
                                    type={isConfirmVisible ? "text" : "password"}
                                    placeholder="Confirmar contraseña"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    aria-label="toggle confirm password visibility"
                                >
                                    {isConfirmVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400" /> : <EyeFilledIcon className="text-2xl text-default-400" />}
                                </button>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <ConfirmationResetPassword />
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default NewPassword;