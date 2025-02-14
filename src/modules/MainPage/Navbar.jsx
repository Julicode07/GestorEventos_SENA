import { Link } from "react-router-dom";
import Images from "@/assets/img/images.js";
import { SessionContext } from "../../context/SessionContext.jsx";
import { useContext } from "react";
import UserDropdown from "@/modules/components/UserDropdown.jsx";

const Navbar = () => {
  const { userSession } = useContext(SessionContext);

  const getPanelLink = () => {
    switch (userSession.role) {
      case "Coordinador":
        return "/admin/coordinador";
      case "Instructor":
        return "/admin/instructor";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-secondary sticky top-0 w-full z-20 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-2">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={Images.logoBlanco}
            width="48"
            height="32"
            alt="Logo Blanco SENA"
          />
          <span className="self-center text-xl md:text-2xl font-bold text-white">
            SENA
          </span>
        </Link>

        <div className="flex gap-1 md:gap-2">
          {userSession.role === null && (
            <>
              <Link
                to="/iniciarsesion"
                type="button"
                className="text-black bg-white focus:outline-none font-bold rounded-lg text-sm md:text-base px-3 py-2 md:px-4 md:py-2 text-center"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registrarse"
                type="button"
                className="text-black bg-white focus:outline-none font-bold rounded-lg text-sm md:text-base px-3 py-2 md:px-4 md:py-2 text-center"
              >
                Registrarse
              </Link>
            </>
          )}

          {(userSession.role === "Coordinador" ||
            userSession.role === "Instructor") && (
              <UserDropdown
                role={userSession.role}
                profileLink={getPanelLink()}
                logoutLink="/"
                textColor="text-white"
                textRole="text-gray-200"
              />
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
