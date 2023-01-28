import React, { useId } from "react";
import { ICardColor } from "../utils/models";
import Icon, { IIconProps } from "./Icon";

export interface IFieldCardColorsProps {
  colors: ICardColor,
  setColors: (colors: ICardColor) => void,
}

interface ICardColorOptions {
  id: string,
  key: keyof ICardColor,
  label: string,
  icon: IIconProps["icon"],
}

export default function FieldCardColors(props: IFieldCardColorsProps) {
  const id = useId();

  const setColor = (key: keyof ICardColor) => {
    let newColors = {...props.colors};
    if (key == "color_colorless") {
      newColors.color_colorless = true;
      newColors.color_white = false;
      newColors.color_blue = false;
      newColors.color_black = false;
      newColors.color_red = false;
      newColors.color_green = false;
    } else {
      newColors[key] = !props.colors[key];
      if (
        !newColors.color_white &&
        !newColors.color_blue &&
        !newColors.color_black &&
        !newColors.color_red &&
        !newColors.color_green
      ) {
        newColors.color_colorless = true;
      } else {
        newColors.color_colorless = false;
      }
    }
    props.setColors(newColors);
  }

  const cardColorOptions: ICardColorOptions[] = [
    {
      id: `${id}-cardcolor-colorless`,
      key: "color_colorless",
      label: "Colorless",
      icon: "mtg-colorless",
    },
    {
      id: `${id}-cardcolor-white`,
      key: "color_white",
      label: "White",
      icon: "mtg-white",
    },
    {
      id: `${id}-cardcolor-blue`,
      key: "color_blue",
      label: "Blue",
      icon: "mtg-blue",
    },
    {
      id: `${id}-cardcolor-black`,
      key: "color_black",
      label: "Black",
      icon: "mtg-black",
    },
    {
      id: `${id}-cardcolor-red`,
      key: "color_red",
      label: "Red",
      icon: "mtg-red",
    },
    {
      id: `${id}-cardcolor-green`,
      key: "color_green",
      label: "Green",
      icon: "mtg-green",
    },
  ];

  return (
    <fieldset className="option-group">
      <legend className="text--header-modal-sm">Card Color</legend>
      { cardColorOptions.map((item: ICardColorOptions, key) => (
        <div className="option" key={key}>
          <input type="checkbox" name={item.id} id={item.id} checked={Boolean(props.colors[item.key])} onChange={() => setColor(item.key)} />
          <label htmlFor={item.id}>
            <Icon icon={item.icon} />
            <span>{item.label}</span>
          </label>
        </div>
      )) }
    </fieldset>
  )
}
