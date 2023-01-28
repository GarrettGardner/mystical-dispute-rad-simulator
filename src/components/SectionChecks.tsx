import React from "react";
import { IRadChecks, IRadCheckStage } from "../utils/models";
import FieldCheck from './FieldCheck';
import Popover from './Popover';

interface ISectionChecks {
  editChecks: (newRadChecks: IRadChecks) => void,
  inputDisabled: boolean,
  radChecks: IRadChecks,
  openModal: (content: JSX.Element) => void,
  simulateRad: () => void,
}

export default function SectionChecks(props: ISectionChecks) {
  const simulateRad = (e: any) => {
    e.preventDefault();
    props.simulateRad();
  }

  const changeInput = (fieldGroup: keyof IRadChecks, fieldKey: keyof IRadCheckStage, value: number) => {
    let newRadChecks = {...props.radChecks};
    if (value < 0 || value > 40) {
      return;
    }
    if (!(fieldGroup in newRadChecks)) {
      return;
    }
    if (!(fieldKey in newRadChecks[fieldGroup])) {
      return;
    }
    newRadChecks[fieldGroup][fieldKey] = value;
    props.editChecks(newRadChecks);
  }

  return (
    <section className="section-rad-checks">
      <h2 className="text--header-section">
        Step 2: Set R.A.D. Checks
        <Popover openModal={props.openModal}>
          <>
            <p className="text--header-modal">R.A.D. Checks</p>
            <p className="text--header-modal-sm">Opening Hand</p>
            <p>An opening hand is defined by the first 7 cards on top of a shuffled deck.</p>
            <p>The checks look for a minimum and maximum number of total lands that defines a Reasonable, Acceptable opening hand.</p>
            <p className="text--header-modal-sm">Early-Game</p>
            <p>The early-game is defined by the top 9 cards of the deck - so approximately turn 2 on the draw or turn 3 on the play.</p>
            <p>Checks include min/max lands as well as a minimum number of playables, which are castable cards (the draw also includes lands that can produce the same color) that are categorized as Early-Game plays.</p>
            <p className="text--header-modal-sm">Mid-Game</p>
            <p>The mid-game is defined by the top 13 cards of the deck - so approximately turn 6 or 7.</p>
            <p>Checks include min/max lands, as well as a minimum number of playables that are categorized as either Early-Game Plays or Mid-Game Plays.</p>
            <p className="text--header-modal-sm">Late-Game</p>
            <p>The late-game is defined by the top 20 cards of the deck - so approximately turn 13 or 14. Given that 17Lands has the average length of most formats in 8-9 turns territory, with the caveat that many games end in early concessions - approximating the end of a game around turns 10/11 with 1 or 2 card draws or loot effects shows you approximatley the top 20 cards of your deck.</p>
            <p>Checks include min/max lands, as well as the minimum number of playables that are categorized as either Mid-Game Plays or Late-Game Plays. A minimum number of castable cards flagged as Interaction as well as a minimum number of castable cards flagged as Bombs are also included.</p>
          </>
        </Popover>
      </h2>
      <form onSubmit={simulateRad}>
        <div className="row row--checks">
          <div className="col">
            <h2 className="text--header-subsection">Opening Hand</h2>
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="draws"
              label="Draws"
              value={props.radChecks.opener.draws}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="minLand"
              label="Min Lands"
              value={props.radChecks.opener.minLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="maxLand"
              label="Max Lands"
              value={props.radChecks.opener.maxLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="minPlayable"
              label="Min Playable (Early)"
              value={props.radChecks.opener.minPlayable}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="minInteraction"
              label="Min Interaction"
              value={props.radChecks.opener.minInteraction}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="opener"
              fieldKey="minBomb"
              label="Min Bomb"
              value={props.radChecks.opener.minBomb}
            />
          </div>
          <div className="col">
            <h2 className="text--header-subsection">Early-Game</h2>
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="draws"
              label="Draws"
              value={props.radChecks.early.draws}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="minLand"
              label="Min Lands"
              value={props.radChecks.early.minLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="maxLand"
              label="Max Lands"
              value={props.radChecks.early.maxLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="minPlayable"
              label="Min Playable (Early)"
              value={props.radChecks.early.minPlayable}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="minInteraction"
              label="Min Interaction"
              value={props.radChecks.early.minInteraction}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="early"
              fieldKey="minBomb"
              label="Min Bomb"
              value={props.radChecks.early.minBomb}
            />
          </div>
          <div className="col">
            <h2 className="text--header-subsection">Mid-Game</h2>
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="draws"
              label="Draws"
              value={props.radChecks.mid.draws}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="minLand"
              label="Min Lands"
              value={props.radChecks.mid.minLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="maxLand"
              label="Max Lands"
              value={props.radChecks.mid.maxLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="minPlayable"
              label="Min Playable (Early/Mid)"
              value={props.radChecks.mid.minPlayable}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="minInteraction"
              label="Min Interaction"
              value={props.radChecks.mid.minInteraction}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="mid"
              fieldKey="minBomb"
              label="Min Bomb"
              value={props.radChecks.mid.minBomb}
            />
          </div>
          <div className="col">
            <h2 className="text--header-subsection">Late-Game</h2>
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="draws"
              label="Draws"
              value={props.radChecks.late.draws}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="minLand"
              label="Min Lands"
              value={props.radChecks.late.minLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="maxLand"
              label="Max Lands"
              value={props.radChecks.late.maxLand}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="minPlayable"
              label="Min Playable (Mid/Late)"
              value={props.radChecks.late.minPlayable}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="minInteraction"
              label="Min Interaction"
              value={props.radChecks.late.minInteraction}
            />
            <FieldCheck
              changeInput={changeInput}
              disabled={props.inputDisabled}
              fieldGroup="late"
              fieldKey="minBomb"
              label="Min Bomb"
              value={props.radChecks.late.minBomb}
            />
          </div>
        </div>
        <p className="text--centered">
          <button className="button" type="submit">Simulate</button>
        </p>
      </form>
    </section>
  );
}
