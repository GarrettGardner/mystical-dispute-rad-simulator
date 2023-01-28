import React from "react";

interface ISectionHeaderProps {
  inputDisabled: boolean,
  clear: () => void,
  preset: (type: string) => void,
  share: () => void,
}

export default function SectionHeader(props: ISectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="row row--header">
        <div className="col col--title">
          <h1 className="text--header-title"><a href="https://rad.mysticaldispute.com">R.A.D. Simulator</a></h1>
          <p className="text--header-version">Version 1.1</p>
          <p className="text--header-description">
            The Reasonable, Acceptable Draw (R.A.D.) simulator takes a hyper-simplified limited Magic
            deck as input and simulates reasonable draws as defined by the game stage checks below.
          </p>
          <div className="tools">
            <button type="button" className="button button--outline button--sm" onClick={() => props.clear()} disabled={props.inputDisabled}>Clear</button>
            <button type="button" className="button button--outline button--sm" onClick={() => props.preset("aggro")} disabled={props.inputDisabled}>Aggro</button>
            <button type="button" className="button button--outline button--sm" onClick={() => props.preset("midrange")} disabled={props.inputDisabled}>Midrange</button>
            <button type="button" className="button button--outline button--sm" onClick={() => props.share()} disabled={props.inputDisabled}>Share</button>
          </div>
        </div>
        <div className="col col--mystical-dispute">
          <img src="assets/images/mystical-dispute.png" alt="Mystical Dispute" />
          <p className="text--centered">
            <a className="button button--sm" href="https://mysticaldispute.com/episode/076-mystical-dispute-variance-and-tilt-part-3/" target="_blank">
              Listen Here
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
