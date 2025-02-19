import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import PropTypes from "prop-types";

const UserDropdown = ({ role, profileLink, textColor, textRole }) => {
  const { names, updateSession, userSession } = useContext(SessionContext);

  useEffect(() => {
    updateSession();
  }, [updateSession]);

  const logOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    window.location.href = "/";
  };

  const fullName = `${names.name || "Usuario"} ${names.lastName || ""}`;

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          loading="lazy"
          avatarProps={{
            src: "https://img.freepik.com/vector-premium/icono-usuario-avatar-perfil-usuario-icono-persona-imagen-perfil-silueta-neutral-genero-adecuado_697711-1132.jpg?w=740",
          }}
          className={`transition-transform ${textColor}`}
          name={
            <>
              <span className="block text-sm font-semibold">{fullName}</span>
            </>
          }
          description={
            <span className={`block text-sm font-semibold${textRole}`}>
              {role}
            </span>
          }
        ></User>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        variant="flat"
        className="divide-y"
      >
        <DropdownItem
          key="user-profile"
          className="h-14 gap-2 border-b"
          textValue="Perfil"
        >
          <User
            as="button"
            avatarProps={{
              src: "https://img.freepik.com/vector-premium/icono-usuario-avatar-perfil-usuario-icono-persona-imagen-perfil-silueta-neutral-genero-adecuado_697711-1132.jpg?w=740",
            }}
            className="transition-transform text-xl"
            description={role}
            name={fullName}
          />
        </DropdownItem>
        <DropdownItem
          key="panel"
          showDivider
          className="text-lg"
          textValue="Ir al panel"
        >
          <Link to={profileLink}>
            <span className="text-base font-medium">Ir al panel</span>
          </Link>
        </DropdownItem>
        <DropdownItem
          key="profile"
          showDivider
          className="text-lg"
          textValue="Perfil"
        >
          <Link
            to={`${
              userSession.role === "Coordinador"
                ? "/admin/coordinador/perfil"
                : "/admin/instructor/perfil"
            }`}
          >
            <span className="text-base font-medium">Perfil</span>
          </Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="flex bg-red-100 mt-2"
          textValue="Cerrar sesión"
        >
          <button
            onClick={logOut}
            type="submit"
            className="h-full flex items-center justify-between text-red-500"
          >
            <span className="font-bold flex h-full justify-between">
              Cerrar sesión
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 ms-2"
              >
                <path d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 11V8L4 12L9 16V13H15V11H9Z"></path>
              </svg>
            </span>
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
UserDropdown.propTypes = {
  role: PropTypes.string,
  profileLink: PropTypes.string,
  logoutLink: PropTypes.string,
  textColor: PropTypes.string,
  textRole: PropTypes.string,
};

export default UserDropdown;
