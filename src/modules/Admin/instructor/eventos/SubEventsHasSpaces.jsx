import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const SubEventsHasSpaces = memo(
  ({
    spaces,
    subEventSpaces,
    SubEventIndex,
    onAddSpace,
    onRemoveSpace,
    onChangeSpace,
  }) => {
    const [selectedSpaces, setSelectedSpaces] = useState({});
    const [inventorySpace, setInventorySpace] = useState({});

    const getInventorySpace = useCallback(async (spaceId, index) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/inventory/space/${spaceId}`
      );
      const data = await response.json();
      if (!spaceId) {
        setInventorySpace((prevState) => ({
          ...prevState,
          [index]: Array.isArray(data) ? data : [data],
        }));
      } else {
        const newData = data.filter((space) => space.id_space !== spaceId);
        setInventorySpace((prevState) => ({
          ...prevState,
          [index]: Array.isArray(newData) ? newData : [newData],
        }));
      }
    }, []);

    useEffect(() => {
      if (subEventSpaces.length > 0) {
        getInventorySpace(
          subEventSpaces[SubEventIndex]?.id_space,
          SubEventIndex
        );
      }
    }, [SubEventIndex, subEventSpaces, getInventorySpace]);

    const handleChange = (e, index) => {
      const { value } = e.target;
      setSelectedSpaces((prevState) => ({
        ...prevState,
        [index]: value,
      }));
      getInventorySpace(value, index);
    };

    return (
      <div className="pr-4 w-full">
        <Button
          color="secondary"
          endContent={<PlusIcon />}
          onClick={() => onAddSpace(SubEventIndex, { id_space: "" })}
          className="mb-4 self-end"
        >
          Asignar un espacio
        </Button>

        <AnimatePresence>
          {subEventSpaces.map((space, spacesIndex) => (
            <motion.div
              key={spacesIndex}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="transition duration-300 ease-in-out flex flex-col mb-4"
            >
              <button
                className="flex items-end justify-end w-full"
                type="button"
                onClick={() => onRemoveSpace(SubEventIndex, spacesIndex)}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <h1 className="font-bold text-xl">Espacio # {spacesIndex + 1}</h1>
              <label className="flex space-x-3 mb-2 text-base font-bold text-gray-900">
                <h1>Selecciona el Espacio:</h1>
                <p>
                  {selectedSpaces[spacesIndex]
                    ? `Espacio # ${selectedSpaces[spacesIndex]}`
                    : "No seleccionado"}
                </p>
              </label>

              {inventorySpace[spacesIndex] &&
                inventorySpace[spacesIndex].length > 0 && (
                  <div className="my-2">
                    <Table aria-label="Example static collection table">
                      <TableHeader>
                        <TableColumn>NOMBRE</TableColumn>
                        <TableColumn>DESCRIPCIÓN</TableColumn>
                        <TableColumn>CANTIDAD</TableColumn>
                        <TableColumn>TIPO</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {inventorySpace[spacesIndex]?.map((inventory) => (
                          <TableRow key={inventory.id_inventory}>
                            <TableCell>{inventory.article_name}</TableCell>
                            <TableCell>{inventory.description}</TableCell>
                            <TableCell>{inventory.quantity}</TableCell>
                            <TableCell>{inventory.type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

              <Select
                size="sm"
                id={`space-${spacesIndex}`}
                label="Elige el espacio"
                name="id_space"
                onChange={(e) => {
                  onChangeSpace(e, SubEventIndex, spacesIndex);
                  handleChange(e, spacesIndex);
                }}
                value={selectedSpaces[spacesIndex] || space.id_space || ""}
              >
                {spaces.map((spaceOption) => (
                  <SelectItem
                    key={spaceOption.id_space}
                    value={spaceOption.id_space}
                  >
                    {spaceOption.name}
                  </SelectItem>
                ))}
              </Select>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

SubEventsHasSpaces.displayName = "SubEventsHasSpaces";

SubEventsHasSpaces.propTypes = {
  spaces: PropTypes.array.isRequired,
  subEventSpaces: PropTypes.array.isRequired,
  SubEventIndex: PropTypes.number.isRequired,
  onAddSpace: PropTypes.func.isRequired,
  onRemoveSpace: PropTypes.func.isRequired,
  onChangeSpace: PropTypes.func.isRequired,
};

export default SubEventsHasSpaces;
