import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const UserDropdown = ({
  role,
  profileLink,
  logoutLink,
  textColor,
  textRole,
}) => {
  const logOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    window.location.href = "/";
  };
  const getInitials = (name) => {
    const parts = name.split(" ");
    return parts.map((part) => part.charAt(0)).join("");
  };
  const fullName = "Felipe Alzate";
  const initials = getInitials(fullName);

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className={`transition-transform ${textColor}`}
          name={
            <>
              <span className="hidden md:block text-sm font-semibold">
                {fullName}
              </span>
              <span className="block md:hidden text-sm font-semibold">
                {initials}
              </span>
            </>
          }
          description={
            <span className={`hidden lg:block text-sm font-semibold${textRole}`}>{role}</span>
          }
        ></User>
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
            className="transition-transform text-xl"
            description={role}
            name="Felipe Alzate"
          />
        </DropdownItem>
        <DropdownItem
          as={Link}
          to={profileLink}
          key="panel"
          showDivider
          className="text-lg"
        >
          <span className="text-base font-medium">Ir al panel</span>
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

export default UserDropdown;
