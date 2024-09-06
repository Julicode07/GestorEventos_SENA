import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const UserDropdown = ({ role, profileLink, logoutLink }) => {
  const logOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    window.location.href = "/";
  };

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="transition-transform text-white"
          name="FA"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        variant="flat"
        className="divide-y"
      >
        <DropdownItem key="profile" className="h-14 gap-2 border-b">
          <User
            as="button"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={role}
            name="Felipe Alzate"
          />
        </DropdownItem>
        <DropdownItem as={Link} to={profileLink} key="panel">
          Ir al panel
        </DropdownItem>
        <DropdownItem
          as={Link}
          to={logoutLink}
          key="logout"
          color="danger"
          className="flex bg-red-100 mt-2"
        >
          <button
            onClick={logOut}
            type="submit"
            className="flex items-center justify-between"
          >
            <span>Cerrar sesión</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 ms-2"
            >
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 11V8L4 12L9 16V13H15V11H9Z"></path>
            </svg>
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
