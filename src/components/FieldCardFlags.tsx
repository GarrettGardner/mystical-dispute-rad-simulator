import React, { useId } from "react";
import { ICardFlag } from "../utils/models";
import Icon, { IIconProps } from "./Icon";

export interface IFieldCardFlagProps {
  flags: ICardFlag,
  setFlags: (types: ICardFlag) => void,
}

interface ICardFlagOptions {
  id: string,
  key: keyof ICardFlag,
  label: string,
  icon: IIconProps["icon"],
}

export default function FieldCardTypes(props: IFieldCardFlagProps) {
  const id = useId()

  const setFlag = (key: keyof ICardFlag) => {
    let newFlags = {...props.flags};
    newFlags[key] = !props.flags[key];
    props.setFlags(newFlags);
  }

  const cardFlagOptions: ICardFlagOptions[] = [
    {
      id: `${id}-cardflag-bomb`,
      key: "flag_bomb",
      label: "Bomb",
      icon: "bomb",
    },
    {
      id: `${id}-cardflag-interaction`,
      key: "flag_interaction",
      label: "Interaction",
      icon: "interaction",
    },
  ];

  return (
    <>
      <h3 className="text--header-modal-sm">Flags</h3>
      { cardFlagOptions.map((item: ICardFlagOptions, key) => (
        <div className="flag" key={key}>
          <input type="checkbox" name={item.id} id={item.id} checked={Boolean(props.flags[item.key])} onChange={() => setFlag(item.key)} />
          <label htmlFor={item.id}>
            <div className="box">
              <Icon icon="check" />
            </div>
            <Icon icon={item.icon} />
            {item.label}
          </label>
        </div>
      )) }
    </>
  )
}
