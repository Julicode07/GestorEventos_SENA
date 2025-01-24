import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@modules/Admin/components/SearchIcon";
import { ChevronDownIcon } from "@modules/Admin/components/ChevronDownIcon";
import PropTypes from "prop-types";

const TopContent = ({
  filterValue,
  onClear,
  onRowsPerPageChange,
  onSearchChange,
  rowsPerPage,
  visibleColumns,
  module,
  setVisibleColumns,
  columns,
  capitalize,
  ModuleModal,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {ModuleModal ? <ModuleModal /> : ""}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {module.length} resultados
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="max-w-full rounded-lg bg-default-100 text-default-900 text-small font-bold"
            onChange={onRowsPerPageChange}
            value={rowsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

TopContent.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  visibleColumns: PropTypes.object,
  module: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  setVisibleColumns: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  capitalize: PropTypes.func.isRequired,
  ModuleModal: PropTypes.elementType,
};

export default TopContent;
