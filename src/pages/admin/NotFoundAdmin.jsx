const NotFound = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="container mx-auto py-6 md:py-0 text-center flex flex-col items-center">
        <div className="w-full max-w-md md:max-w-base mb-4">
          <img
            src="https://flowbite-admin-dashboard.vercel.app/images/illustrations/404.svg"
            alt="404 Illustration"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Página no encontrada
          </h1>
          <p className="mb-6 text-base font-normal text-gray-600 md:text-lg">
            No pudimos encontrar la página que estabas buscando.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Regresa a la página principal
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
