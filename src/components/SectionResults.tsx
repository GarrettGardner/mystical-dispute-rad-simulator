import React from "react";
import { CommonUtil } from "../utils/CommonUtil";
import { IRadChecks, IRadOutput } from "../utils/models";
import RadResult from './RadResult';

interface ISectionResults {
  editInputs: () => void,
  radChecks: IRadChecks,
  radOutput: IRadOutput,
}

export default function SectionResults(props: ISectionResults) {
  return (
    <section className="section-results">
      <p className="text--header-modal">R.A.D. Simulator Results</p>
      <div className="bar">
        <div className="fill" style={{width: `${CommonUtil.percent(props.radOutput.totalSuccesses, props.radOutput.simulations)}`}}></div>
      </div>
      <p className="text--percentage">{CommonUtil.percent(props.radOutput.totalSuccesses, props.radOutput.simulations)} R.A.D.</p>
      <p className="text--total">{props.radOutput.totalSuccesses.toLocaleString('en-US')} / {props.radOutput.simulations.toLocaleString('en-US')} Simulated Draws</p>
      <div className="row row--results">
        <div className="col">
          <h4 className="text--header-subsection">Opening Hand R.A.D.</h4>
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.successes, props.radOutput.simulations)}
            label={`Total (${props.radChecks.opener.draws} Draws)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.minLandSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.opener.minLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.maxLandSuccesses, props.radOutput.simulations)}
            label={`At most ${props.radChecks.opener.maxLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.minPlayableSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.opener.minPlayable} Plays (Early)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.minInteractionSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.opener.minInteraction} Interaction`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.opener.minBombSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.opener.minBomb} Bombs`}
          />
        </div>
        <div className="col">
          <h4 className="text--header-subsection">Early-Game R.A.D.</h4>
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.successes, props.radOutput.simulations)}
            label={`Total (${props.radChecks.early.draws} Draws)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.minLandSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.early.minLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.maxLandSuccesses, props.radOutput.simulations)}
            label={`At most ${props.radChecks.early.maxLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.minPlayableSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.early.minPlayable} Plays (Early)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.minInteractionSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.early.minInteraction} Interaction`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.early.minBombSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.early.minBomb} Bombs`}
          />
        </div>
        <div className="col">
          <h4 className="text--header-subsection">Mid-Game R.A.D.</h4>
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.successes, props.radOutput.simulations)}
            label={`Total (${props.radChecks.mid.draws} Draws)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.minLandSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.mid.minLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.maxLandSuccesses, props.radOutput.simulations)}
            label={`At most ${props.radChecks.mid.maxLand} Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.minPlayableSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.mid.minPlayable} Plays (Early/Mid)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.minInteractionSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.mid.minInteraction} Interaction`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.mid.minBombSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.mid.minBomb} Bombs`}
          />
        </div>
        <div className="col">
          <h4 className="text--header-subsection">Late-Game R.A.D.</h4>
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.successes, props.radOutput.simulations)}
            label={`Total (${props.radChecks.late.draws} Draws)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.minLandSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.late.minLand} Total Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.maxLandSuccesses, props.radOutput.simulations)}
            label={`At most ${props.radChecks.late.maxLand} Total Lands`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.minPlayableSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.late.minPlayable} Plays (Mid/Late)`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.minInteractionSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.late.minInteraction} Interaction`}
          />
          <RadResult
            total={CommonUtil.percent(props.radOutput.late.minBombSuccesses, props.radOutput.simulations)}
            label={`At least ${props.radChecks.late.minBomb} Bombs`}
          />
        </div>
      </div>
      <p className="text--centered">
        <button className="button" type="button" onClick={() => props.editInputs()}>Edit Inputs</button>
      </p>
    </section>
  );
}
