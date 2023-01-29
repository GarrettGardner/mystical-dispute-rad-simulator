import React, { useState, useEffect, useId } from "react";
import { ICardType, ICardColor, ICardFlag, ICard } from "../utils/models";
import { DEFAULT_CARD } from "../utils/defaults";
import FieldCardColors from "./FieldCardColors";
import FieldCardFlags from "./FieldCardFlags";
import FieldCardTypes from "./FieldCardTypes";

export interface IFormAddCardFields extends ICard {
  number: number,
}

export interface IFormAddCardProps {
  addCards: (addCardFields: IFormAddCardFields) => void,
  type: keyof ICardType,
}

export default function FormAddCard(props: IFormAddCardProps) {
  const id = useId();
  const [fields, setFields] = useState<IFormAddCardFields>({
    ...DEFAULT_CARD,
    number: 1,
  });

  useEffect(() => {
    if (props.type !== "type_land") {
      setFields({
        ...fields,
        type_land: false,
        [props.type]: true,
      });
    }
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    props.addCards(fields);
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

  const numberID = `${id}-number`;

  return (
    <div className="form-add-card">
      <h2 className="text--header-modal">Add Card</h2>
      <form onSubmit={submitForm}>
        <FieldCardTypes types={fields} setTypes={setTypes} />
        <FieldCardColors colors={fields} setColors={setColors} />
        {
          !fields.type_land &&
          <FieldCardFlags flags={fields} setFlags={setFlags} />
        }
        <label className="text--header-modal-sm" htmlFor={numberID}>Number of Cards to Add</label>
        <input type="number" className="number-cards" name={numberID} id={numberID} min="1" max="40" step="1" value={fields.number} onChange={(e) => setFields({...fields, number: Number(e.target.value)})} />
        <p className="text--centered"><button type="submit" className="button">Add Card</button></p>
      </form>
    </div>
  )
}
