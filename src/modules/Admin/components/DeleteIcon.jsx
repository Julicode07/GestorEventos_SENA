import PropTypes from "prop-types";
import { memo } from "react";

export const DeleteIcon = memo(
  ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size || width || 24}
        height={size || height || 24}
        {...props}
        fill={fill}
      >
        <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"></path>
      </svg>
    );
  }
);

DeleteIcon.displayName = "DeleteIcon";

DeleteIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};
