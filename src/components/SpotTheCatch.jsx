// MoneyMentor — "Spot the Catch" interface placeholder (AI-generated).
// Interface only. No scenarios, scoring, feedback or financial-decision logic
// exist here; the Start button is disabled and labelled as not built yet.

import { TargetIcon } from "./icons.jsx";

const STEPS = [
  {
    title: "Read the scenario",
    copy: "A short, realistic money situation is presented — an offer, an advert or a decision to make.",
  },
  {
    title: "Make your call",
    copy: "Choose how you would respond before seeing any explanation.",
  },
  {
    title: "See the catch",
    copy: "The reasoning and the trade-offs behind the scenario are revealed afterwards.",
  },
];

function SpotTheCatch() {
  return (
    <section
      className="section section--alt"
      id="spot-the-catch"
      aria-labelledby="spot-title"
    >
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">
            <span className="badge badge--soon">Coming soon</span>
          </p>
          <h2 className="section__title" id="spot-title">
            Spot the Catch
          </h2>
          <p className="section__lede">
            A look at the three steps the interactive scenarios will follow.
            Nothing is playable yet.
          </p>
        </div>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step__num">{index + 1}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__copy">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="step-panel">
          <span className="brand__mark" aria-hidden="true">
            <TargetIcon />
          </span>
          <div className="step-panel__copy">
            <h3 className="step__title">Scenarios are still being written</h3>
            <p className="step__copy">
              The scenario content, the scoring and the feedback logic are all
              deliberately left out of this build.
            </p>
          </div>
          <button type="button" className="btn btn--accent" disabled>
            Start a scenario
          </button>
        </div>
      </div>
    </section>
  );
}

export default SpotTheCatch;
