import React from "react";
import Icon from "./Icon";

interface IButtonAddCardProps {
  disabled: boolean,
  label: string,
  addCard: () => void,
}

export default function ButtonAddCard(props: IButtonAddCardProps) {
  return (
    <button type="button" className="button-add-card" onClick={props.addCard} disabled={props.disabled}>
      <span>{ props.label }</span>
      <Icon icon="add" />
    </button>
  );
}
