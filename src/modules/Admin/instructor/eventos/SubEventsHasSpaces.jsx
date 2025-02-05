import { Button, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import PropTypes from "prop-types";
import { memo } from "react";

const SubEventsHasSpaces = memo(
  ({
    spaces,
    subEventSpaces,
    SubEventIndex,
    onAddSpace,
    onRemoveSpace,
    onChangeSpace,
  }) => {
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

        {subEventSpaces.map((space, spacesIndex) => (
          <div key={spacesIndex} className="flex flex-col mb-4">
            <button
              className="flex items-end justify-end w-full"
              type="button"
              onClick={() => onRemoveSpace(SubEventIndex, spacesIndex)}
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h1 className="font-bold text-xl">Espacio # {spacesIndex + 1}</h1>
            <label
              className="block mb-2 text-base font-bold text-gray-900"
              htmlFor={`space-${spacesIndex}`}
            >
              Selecciona el Espacio
            </label>
            <Select
              id={`space-${spacesIndex}`}
              label="Elige el espacio"
              name="id_space"
              data-testid={`space-${spacesIndex}`}
              onChange={(e) => onChangeSpace(e, SubEventIndex, spacesIndex)}
              value={space.id_space}
            >
              {spaces.map((space) => (
                <SelectItem key={space.id_space}>{space.name}</SelectItem>
              ))}
            </Select>
          </div>
        ))}
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
