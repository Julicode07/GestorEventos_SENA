import { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchableSelect = memo(({ options, value, onChange, label, name }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.subEventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    onChange({ target: { name, value: "" } });
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    onChange({ target: { name, value: selectedId } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.id_sub_event === value
  );

  return (
    <div className="relative w-full pb-3" ref={selectRef}>
      <label className="pl-1">{label}</label>
      <div
        className="w-full rounded-xl px-2 py-2 flex items-center justify-between cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-base">
          {selectedOption
            ? selectedOption.subEventName
            : "Selecciona una opción"}
        </span>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full bg-gray-100 rounded-xl shadow-xl mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border-b focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1 text-xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            )}
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id_sub_event}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    handleSelectChange({
                      target: { value: option.id_sub_event },
                    });
                  }}
                >
                  {option.subEventName}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      )}

      <select
        name={name}
        value={value}
        onChange={handleSelectChange}
        className="hidden"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.id_sub_event} value={option.id_sub_event}>
            {option.subEventName}
          </option>
        ))}
      </select>
    </div>
  );
});

SearchableSelect.displayName = "SearchableSelect";

SearchableSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default SearchableSelect;
