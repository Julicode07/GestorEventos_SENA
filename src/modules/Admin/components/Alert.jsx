import PropTypes from "prop-types";

const Alert = ({ message }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-red-300 text-red-700 font-semibold px-6 py-3 rounded-lg shadow-red-700 flex items-center space-x-3 z-50 mr-4">
      <svg
        className="w-6 h-6 text-red-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11.5l3 3 5-5m-5 5V4m-2 14v-4m0-4h4M4 12h4m4 0h4"></path>
      </svg>
      <span>{message}</span>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
