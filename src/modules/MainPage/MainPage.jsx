import Navbar from "./Navbar.jsx";
import Header from "./Header.jsx";
import Calendar from "../Calendar/Calendar.jsx";

const MainPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <section className="relative bg-center bg-no-repeat bg-cover bg-[url('/main-img.jpg')] bg-gray-700 bg-blend-multiply  max-w-screen h-full mx-auto">
        <div className="flex flex-col items-center justify-center px-4 py-28 mx-auto max-w-screen-xl text-center h-full">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white md:text-6xl">
            Gestor de eventos SENA
          </h1>
          <h2 className="mb-6 text-xl lg:text-2xl font-semibold leading-tight text-gray-100">
            Sede Comercio - Rionegro, Antioquia
          </h2>
          <p className="mb-8 text-base font-normal text-gray-300 lg:text-lg sm:px-16 lg:px-60">
            Crea y administra todos tus eventos de manera centralizada y
            eficiente en un solo lugar. Facilita la planificación organizando
            cada detalle y mantén una comunicación constante para asegurar el
            éxito de cada evento, optimizando el tiempo y mejorando la
            coordinación interna.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#calendario"
              className="text-white font-bold  bg-primary hover:bg-primary rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center group"
            >
              Ver calendario
              <svg
                className="rtl:rotate-180 w-4 h-4 ms-2 transition-transform duration-300 ease-in-out group-hover:rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      <Calendar />
    </>
  );
};
export default MainPage;
