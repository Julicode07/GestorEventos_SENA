import { Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";

const BottomContent = ({ page, pages, setPage }) => {
  return (
    <div className="py-0 px-2 flex justify-center items-center">
      <Pagination
        showControls
        isCompact
        showShadow
        page={page}
        total={pages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

BottomContent.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  setPage: PropTypes.func,
};
export default BottomContent;
