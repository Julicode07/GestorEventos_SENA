import { Button } from "@nextui-org/react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import PropTypes from "prop-types";
import { memo } from "react";

const InsumesModal = memo(
  ({ insumes, SubEventIndex, onAddInsume, onRemoveInsume, onChangeInsume }) => {
    return (
      <div className="pl-4 w-full">
        <Button
          className="bg-primary text-white mb-4"
          endContent={<PlusIcon />}
          onClick={() => onAddInsume(SubEventIndex, { name: "", quantity: "" })}
        >
          Insumos
        </Button>

        {insumes.map((insum, insumesIndex) => (
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
                Nombre
              </label>
              <input
                type="text"
                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                id={`name-${insumesIndex}`}
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
                Cantidad
              </label>
              <input
                type="number"
                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                id={`quantity-${insumesIndex}`}
                onChange={(e) => onChangeInsume(e, SubEventIndex, insumesIndex)}
                name="quantity"
                value={insum.quantity}
              />
            </div>
          </div>
        ))}
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
