import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationResetPassword = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [statusPassword, setStatusPassword] = useState(true);
    const navigate = useNavigate();
    return (
        <div>
            <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all"
                onClick={() => setIsModalOpen(true)}
            >
                Guardar contraseña
            </button>
            {IsModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg z-50 text-center">
                        <div className="flex flex-col items-center">
                            {statusPassword ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-16 w-16 text-green-500"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z" />
                                    </svg>
                                    <h2 className="text-2xl font-semibold mt-4">¡Contraseña restablecida!</h2>
                                    <p className="text-gray-600 mt-2">Tu contraseña ha sido actualizada exitosamente.</p>
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-16 w-16 text-red-500"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                    <h2 className="text-2xl font-semibold mt-4">¡Error!</h2>
                                    <p className="text-gray-600 mt-2">Hubo un problema al restablecer tu contraseña. Inténtalo de nuevo.</p>
                                </>
                            )}
                        </div>
                        <button
                            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                            onClick={() => {
                                setIsModalOpen(false);
                                navigate("/iniciarsesion");
                            }}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmationResetPassword;