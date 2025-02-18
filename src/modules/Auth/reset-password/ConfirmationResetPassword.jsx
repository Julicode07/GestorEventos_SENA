import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ConfirmationResetPassword = ({ statusPassword, setStatusPassword }) => {
  const navigate = useNavigate();
  return (
    <div>
      {statusPassword && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setStatusPassword(false);
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
                  <h2 className="text-2xl font-semibold mt-4">
                    ¡Enlace de restablecimiento!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Si tu correo esta asociado a una cuenta te enviaremos un
                    link de restablecimiento de contraseña a tu correo.
                  </p>
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
                  <p className="text-gray-600 mt-2">
                    Hubo un problema al restablecer tu contraseña. Inténtalo de
                    nuevo.
                  </p>
                </>
              )}
            </div>
            <button
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
              onClick={() => navigate("/iniciarsesion")}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ConfirmationResetPassword.propTypes = {
  statusPassword: PropTypes.bool,
  setStatusPassword: PropTypes.func,
};

export default ConfirmationResetPassword;
