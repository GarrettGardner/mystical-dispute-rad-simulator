import React from "react";

interface IRadResultProps {
  total: string,
  label: string,
}

export default function RadResult(props: IRadResultProps) {
  return (
    <dl className="result">
      <dt className="percentage">{props.total}</dt>
      <dd className="label">{props.label}</dd>
    </dl>
  );
}
