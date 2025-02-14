import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SessionContext } from "@/context/SessionContext.jsx";
import Images from "@/assets/img/images.js";
import ItemsList from "../components/ItemsList.jsx";
import UserDropdown from "@/modules/components/UserDropdown.jsx";

const NavSideBar = () => {
  const { userSession } = useContext(SessionContext);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('[aria-controls="sidebar"]') // Asegúrate de que no proviene del botón
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <nav className="fixed top-0 z-40 w-full bg-white shadow-md border-b border-gray-300">
        <div className="px-1 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="sidebar"
                type="button"
                className="inline-flex items-center p-2 text-gray-800 rounded-lg sm:hidden hover:bg-gray-100"
              >
                <span className="sr-only">Abrir menú</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex items-center gap-4 ms-2 md:me-24">
                <img
                  src={Images.logoVerde}
                  className="h-10 w-auto"
                  height="48"
                  alt="Logo SENA"
                />
                <span className="self-center text-xl font-bold sm:text-3xl text-gray-800">
                  Instructor
                </span>
              </a>
            </div>
            <UserDropdown
              role={userSession.role}
              profileLink={getPanelLink()}
              logoutLink="/"
              textColor="text-black"
              textRole="text-black"
            />
          </div>
        </div>
      </nav>

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-30 w-56 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white shadow-xl sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-bold">
            <ItemsList
              to={"/admin/instructor"}
              logo="ri-dashboard-horizontal-fill flex w-5 h-5 text-xl justify-center items-center text-primary transition duration-75 group-hover:text-gray-600"
              title="Panel"
            />
            <ItemsList
              to={"/admin/instructor/espacios"}
              logo="ri-road-map-fill flex w-5 h-5 text-xl justify-center items-center text-primary transition duration-75 group-hover:text-gray-600"
              title="Espacios"
            />
            <ItemsList
              to={"/admin/instructor/eventos"}
              logo="ri-inbox-2-fill flex w-5 h-5 text-xl justify-center items-center text-primary transition duration-75 group-hover:text-gray-600"
              title="Eventos"
            />
            <ItemsList
              to={"/admin/instructor/solicitudes"}
              logo="ri-pencil-ruler-fill flex w-5 h-5 text-xl justify-center items-center text-primary transition duration-75 group-hover:text-gray-600"
              title="Solicitudes"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default NavSideBar;
