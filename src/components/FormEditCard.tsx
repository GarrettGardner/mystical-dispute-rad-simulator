import React, { useState } from "react";
import { ICardType, ICardColor, ICardFlag, ICard } from "../utils/models";
import FieldCardColors from "./FieldCardColors";
import FieldCardFlags from "./FieldCardFlags";
import FieldCardTypes from "./FieldCardTypes";

export interface IFormEditCardFields extends ICard { }

export interface IFormEditCardProps {
  index: number,
  card: ICard,
  editCard: (index: number, editCardFields: IFormEditCardFields) => void,
}

export default function AddCardForm(props: IFormEditCardProps) {
  const [index, setIndex] = useState(props.index);
  const [fields, setFields] = useState(props.card);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    props.editCard(index, fields);
  }

  const setTypes = (types: ICardType) => {
    let newFields = {...fields, ...types};
    setFields(newFields);
  }

  const setColors = (colors: ICardColor) => {
    let newFields = {...fields, ...colors};
    setFields(newFields);
  }

  const setFlags = (flags: ICardFlag) => {
    let newFields = {...fields, ...flags};
    setFields(newFields);
  }

  return (
    <div className="form-add-card">
      <h2 className="text--header-modal">Edit Card</h2>
      <form onSubmit={submitForm}>
        <FieldCardTypes types={fields} setTypes={setTypes} />
        <FieldCardColors colors={fields} setColors={setColors} />
        {
          !fields.type_land &&
          <FieldCardFlags flags={fields} setFlags={setFlags} />
        }
        <p className="text--centered">
          <button type="submit" className="button">Save Card</button>
        </p>
      </form>
    </div>
  )
}
