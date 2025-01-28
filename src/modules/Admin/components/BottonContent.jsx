import { Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";
import { memo } from "react";

const BottomContent = memo(({ page, pages, setPage }) => {
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
});

BottomContent.displayName = "BottomContent";

BottomContent.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  setPage: PropTypes.func,
};
export default BottomContent;
