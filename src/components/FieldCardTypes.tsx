import React, { useId } from "react";
import { ICardType } from "../utils/models";

export interface IFieldCardTypeProps {
  types: ICardType,
  setTypes: (types: ICardType) => void,
}

interface ICardTypeOptions {
  id: string,
  key: keyof ICardType,
  label: string,
}

export default function FieldCardTypes(props: IFieldCardTypeProps) {
  const id = useId()

  const setType = (key: keyof ICardType) => {
    let newTypes = {...props.types};
    if (key == "type_land") {
      newTypes.type_land = true;
      newTypes.type_early = false;
      newTypes.type_mid = false;
      newTypes.type_late = false;
    } else {
      newTypes[key] = !props.types[key];
      newTypes.type_land = false;
    }
    props.setTypes(newTypes);
  }

  const cardTypeOptions: ICardTypeOptions[] = [
    {
      id: `${id}-cardtype-land`,
      key: "type_land",
      label: "Land",
    },
    {
      id: `${id}-cardtype-early`,
      key: "type_early",
      label: "Early-Game Play",
    },
    {
      id: `${id}-cardtype-mid`,
      key: "type_mid",
      label: "Mid-Game Play",
    },
    {
      id: `${id}-cardtype-late`,
      key: "type_late",
      label: "Late-Game Play",
    },
  ];

  return (
    <fieldset className="option-group">
      <legend className="text--header-modal-sm">Card Type</legend>
      { cardTypeOptions.map((item: ICardTypeOptions, key) => (
        <div className="option" key={key}>
          <input type="checkbox" name={item.id} id={item.id} checked={Boolean(props.types[item.key])} onChange={() => setType(item.key)} />
          <label htmlFor={item.id}>{item.label}</label>
        </div>
      )) }
    </fieldset>
  )
}
