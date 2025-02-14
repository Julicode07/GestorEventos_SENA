import { Button, Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import PropTypes from "prop-types";
import { memo } from "react";

const InsumesModal = memo(
  ({ insumes, SubEventIndex, onAddInsume, onRemoveInsume, onChangeInsume }) => {
    return (
      <div className="px-4 w-full">
        <Button
          className="bg-primary text-white mb-4"
          endContent={<PlusIcon />}
          onClick={() => onAddInsume(SubEventIndex, { name: "", quantity: "" })}
        >
          Insumos
        </Button>
        <AnimatePresence>
          {insumes.map((insum, insumesIndex) => (
            <motion.div
              key={insumesIndex}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="transition duration-300 ease-in-out flex flex-col mb-4"
            >
              <div key={insumesIndex} className="flex flex-col mb-4">
                <button
                  className="flex items-end justify-end w-full"
                  type="button"
                  onClick={() => onRemoveInsume(SubEventIndex, insumesIndex)}
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
                <h1 className="font-bold text-2xl">Insumo # {insumesIndex + 1}</h1>
                <div>
                  <label
                    className="block mb-2 mt-4 text-base font-bold text-gray-900"
                    htmlFor={`name-${insumesIndex}`}
                  >
                    Ingrese el nombre del insumo
                  </label>
                  <Input
                    type="text"
                    id={`name-${insumesIndex}`}
                    placeholder="Nombre del insumo"
                    onChange={(e) => onChangeInsume(e, SubEventIndex, insumesIndex)}
                    name="name"
                    value={insum.name}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 mt-4 text-base font-bold text-gray-900"
                    htmlFor={`quantity-${insumesIndex}`}
                  >
                    Ingrese la cantidad
                  </label>
                  <Input
                    type="number"
                    placeholder="Cantidad"
                    id={`quantity-${insumesIndex}`}
                    onChange={(e) => onChangeInsume(e, SubEventIndex, insumesIndex)}
                    name="quantity"
                    value={insum.quantity}
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

InsumesModal.displayName = "InsumesModal";

InsumesModal.propTypes = {
  insumes: PropTypes.array.isRequired,
  SubEventIndex: PropTypes.number.isRequired,
  onAddInsume: PropTypes.func.isRequired,
  onRemoveInsume: PropTypes.func.isRequired,
  onChangeInsume: PropTypes.func.isRequired,
};

export default InsumesModal;
