import { useState, useEffect, useRef } from "react";

const SearchableSelect = ({ options, value, onChange, label }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleClear = () => {
        onChange("");
        setSearchTerm("");
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

    return (
        <div className="relative w-full pb-3" ref={selectRef}>
            <label className="pl-1">{label}</label>
            <div
                className="w-full rounded-xl px-2 py-2 flex items-center justify-between cursor-pointer bg-gray-100 hover:bg-gray-200"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-base">{value || "Seleccione una opción"}</span>
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

                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-200"
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No se encontraron resultados</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
