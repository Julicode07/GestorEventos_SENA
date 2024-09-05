import Images from "./../../../assets/img/images.js";

const Header = () => {
  return (
    <div>
      <nav className="bg-primary">
        <div className="relative max-w-screen-xl flex items-center justify-center mx-auto p-2">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={Images.logoBlanco}
              className="h-7 md:h-8 w-auto"
              height="48"
              alt="Logo Blanco SENA"
            />
            <span className="self-center text-xl md:text-2xl font-bold whitespace-nowrap text-white">
              Gestor de eventos
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
