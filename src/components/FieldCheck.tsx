import React, { useId } from "react";
import { IRadChecks, IRadCheckStage } from "../utils/models";

interface IFieldCheck {
  disabled: boolean,
  fieldGroup: keyof IRadChecks,
  fieldKey: keyof IRadCheckStage,
  label: string,
  value: number,
  changeInput: (fieldGroup: keyof IRadChecks, fieldKey: keyof IRadCheckStage, value: number) => void,
}

export default function FieldCheck(props: IFieldCheck) {
  const id = useId();

  const fieldID = `${id}-check-field`;
  
  return (
    <div className="input">
      <input type="number" value={props.value} id={fieldID} name={fieldID} onChange={(e) => props.changeInput(props.fieldGroup, props.fieldKey, Number(e.target.value))} disabled={props.disabled} min="0" max="40" step="1" />
      <label className="label" htmlFor={fieldID}>{props.label}</label>
    </div>
  );
}
