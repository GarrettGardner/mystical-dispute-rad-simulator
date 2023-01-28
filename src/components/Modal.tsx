import React, { useEffect } from "react";
import Icon from "./Icon";

interface IModalProps {
  children: React.ReactNode,
  closeModal: () => void,
}

export default function Modal(props: IModalProps) {
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    }
  });

  return (
    <div className="modal">
      <div className="inner">
        <div className="mask" onClick={props.closeModal}></div>
        <div className="inside">
          <div className="content">
            <button type="button" className="button-close" onClick={props.closeModal}>
              <Icon icon="close" />
            </button>
            { props.children }
          </div>
        </div>
      </div>
    </div>
  )
}
