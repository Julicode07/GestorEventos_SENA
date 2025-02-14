import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import PropTypes from "prop-types";
import { memo } from "react";

const OrganizersModal = memo(
  ({
    organizers,
    subEventIndex,
    onAddOrganizer,
    onRemoveOrganizer,
    onChangeOrganizer,
  }) => {
    return (
      <div className="sm:pl-4 w-full">
        <Button
          className="text-white"
          color="warning"
          endContent={<PlusIcon />}
          onClick={() =>
            onAddOrganizer(subEventIndex, {
              name: "",
              rol: "",
              email: "",
              address: "",
            })
          }
        >
          Agregar Organizadores
        </Button>
        <AnimatePresence>
          {organizers.map((organizer, organizerIndex) => (
            <motion.div
              key={organizerIndex}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="transition duration-300 ease-in-out flex flex-col mb-4"
            >
              <div key={organizerIndex} className="flex flex-col mb-4">
                <button
                  className="flex items-end justify-end w-full"
                  type="button"
                  onClick={() => onRemoveOrganizer(subEventIndex, organizerIndex)}
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
                <h1 className="font-bold text-2xl">
                  Organizador # {organizerIndex + 1}
                </h1>

                <div>
                  <label className="block mb-2 text-lg font-bold text-gray-900">
                    Nombre del organizador
                  </label>
                  <Input
                    id="organizer"
                    placeholder="Nombre del organizador"
                    type="text"
                    name="name"
                    value={organizer.name}
                    onChange={(e) =>
                      onChangeOrganizer(e, subEventIndex, organizerIndex)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-bold text-gray-900">
                    Seleccione el rol
                  </label>

                  <Select
                    id="role"
                    size="xl"
                    placeholder="Rol"
                    name="rol"
                    value={organizer.rol}
                    onChange={(e) =>
                      onChangeOrganizer(e, subEventIndex, organizerIndex)
                    }
                  >
                    <SelectItem key="Aprendiz">Aprendiz</SelectItem>
                    <SelectItem key="Docente">Docente</SelectItem>
                    <SelectItem key="Coordinador">Coordinador</SelectItem>
                    <SelectItem key="Personal">Personal</SelectItem>
                    <SelectItem key="Persona externa">Persona externa</SelectItem>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-lg font-bold text-gray-900">
                    Ingrese el correo
                  </label>
                  <Input
                    id="email"
                    placeholder="Correo"
                    type="email"
                    name="email"
                    value={organizer.email}
                    onChange={(e) =>
                      onChangeOrganizer(e, subEventIndex, organizerIndex)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-lg font-bold text-gray-900">
                    Ingrese la direccion
                  </label>
                  <Textarea
                    id="address"
                    className="w-full mb-4"
                    placeholder="Direccion"
                    type="text"
                    name="address"
                    value={organizer.address}
                    onChange={(e) =>
                      onChangeOrganizer(e, subEventIndex, organizerIndex)
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

OrganizersModal.displayName = "OrganizersModal";

OrganizersModal.propTypes = {
  organizers: PropTypes.object,
  subEventIndex: PropTypes.number,
  onAddOrganizer: PropTypes.func,
  onRemoveOrganizer: PropTypes.func,
  onChangeOrganizer: PropTypes.func,
};

export default OrganizersModal;
