import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalInventarioActualizar = ({ isOpen, setIsOpen, idSpaces }) => {
    const { update } = useUpdate();
    const [getSpaceById, setGetSpaceById] = useState([]);
    const [updateSpace, setUpdateSpace] = useState({
        name: "",
        capacity: "",
        type: "",
        status: "",
        details: "",
    });

    const getSpace = useCallback(async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/spaces/${idSpaces}`
        );
        const data = await response.json();
        setGetSpaceById(data);
    }, [idSpaces]);

    useEffect(() => {
        if (getSpaceById.length > 0) {
            setUpdateSpace({
                name: getSpaceById[0].name,
                capacity: getSpaceById[0].capacity,
                type: getSpaceById[0].type,
                status: getSpaceById[0].status,
                details: getSpaceById[0].details,
            });
        }
    }, [getSpaceById]);

    useEffect(() => {
        getSpace();
    }, [getSpace]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateSpace((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updateSpace);
        try {
            const result = await update(
                updateSpace,
                `/api/spaces/update/${idSpaces}`
            );
            setSuccessMessage(result.message);
            setErrorMessage("");
            setUpdateSpace({
                name: "",
                capacity: "",
                type: "",
                status: "",
            });
            window.location.reload();
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(error.message);
        }
    };
    return (
        <>
            {isOpen && (
                <form action="" onSubmit={handleSubmit}>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 h-screen"
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            className={`bg-white border border-gray-300 shadow-2xl p-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                                } transition-all duration-300 ease-out`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxHeight: "90vh" }}
                        >
                            <a
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                                </svg>
                            </a>

                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                                Actualizar Inventario
                            </h2>
                            <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                                <div className="w-full">
                                    <label className="pl-1" htmlFor="nombre-espacio">
                                        Espacio
                                    </label>
                                    <Input
                                        id="nombre-espacio"
                                        className="w-full mb-4"
                                        placeholder="Nombre"
                                        name="space"
                                        onChange={handleChange}
                                        value={updateSpace.name || ""}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="pl-1" htmlFor="nombre-objeto">
                                        Nombre
                                    </label>
                                    <Input
                                        id="nombre-objeto"
                                        className="w-full mb-4"
                                        placeholder="Nombre"
                                        type="text"
                                        name="name"
                                        value={updateSpace.capacity || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="pl-1" htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <Textarea
                                        id="descripcion"
                                        placeholder="Descripcion"
                                        className="mb-4"
                                        name="description"
                                        value={updateSpace.details || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="pl-1" htmlFor="cantidad">
                                        Cantidad
                                    </label>
                                    <Input
                                        id="cantidad"
                                        className="w-full mb-4"
                                        placeholder="Cantidad"
                                        type="number"
                                        name="quantity"
                                        value={updateSpace.capacity || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full mb-4">
                                    <label className="pl-1" htmlFor="tipo-inventario">
                                        Tipo
                                    </label>
                                    <span className="block my-2">
                                        <b>Espacio actual:</b> {updateSpace.type}
                                    </span>
                                    <Select
                                        id="tipo-inventario"
                                        label="Seleccione el tipo"
                                        className=""
                                        name="type"
                                        value={updateSpace.type || ""}
                                        data-testid="tipo-inventario"
                                        onChange={handleChange}
                                    >
                                        <SelectItem key="">Seleccione el tipo</SelectItem>
                                        <SelectItem key="aula">Aula</SelectItem>
                                        <SelectItem key="piso">Piso</SelectItem>
                                        <SelectItem key="edificio">Edificio</SelectItem>
                                        <SelectItem key="oficina">Oficina</SelectItem>
                                    </Select>
                                </div>
                            </div>

                            <div className="my-2">
                                {successMessage && (
                                    <div className="text-center text-sm text-green-600 font-bold">
                                        {successMessage}
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="text-center text-sm text-red-600 font-bold">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <Button color="primary" type="submit">
                                Actualizar
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
ModalInventarioActualizar.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

export default ModalInventarioActualizar;
