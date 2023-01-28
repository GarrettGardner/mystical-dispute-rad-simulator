import React from "react";
import Icon from "./Icon";

interface IPopoverProps {
  openModal: (content: JSX.Element) => void,
  children: JSX.Element,
}

export default function Popover(props: IPopoverProps) {
  return (
    <button type="button" className="button-popover" onClick={() => props.openModal(props.children)}>
      <Icon icon="info" />
    </button>
  );
}
