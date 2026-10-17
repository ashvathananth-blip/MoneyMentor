// MoneyMentor — Grok AI tutor interface placeholder (AI-generated).
//
// This is a VISUAL placeholder only. There is no API call, no proxy, no
// generated answer and no citation lookup in this file. The input and send
// button are disabled, and the citation slots are empty so nothing on screen
// can be mistaken for a verified source.

import { SparkIcon } from "./icons.jsx";

function TutorPlaceholder() {
  return (
    <section className="section" id="tutor" aria-labelledby="tutor-title">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">Ask the Tutor</p>
          <h2 className="section__title" id="tutor-title">
            Your financial tutor
          </h2>
          <p className="section__lede">
            The planned home for follow-up questions about any discovery, with
            the sources for every answer shown alongside it.
          </p>
        </div>

        <div className="tutor__panel">
          <div className="tutor__row">
            <label className="sr-only" htmlFor="tutor-question">
              Your question for the tutor
            </label>
            <textarea
              className="tutor__input"
              id="tutor-question"
              name="tutor-question"
              placeholder="Ask about financial aid appeals, building credit, or Roth IRAs…"
              disabled
            />
            <button type="button" className="btn btn--accent" disabled>
              <SparkIcon />
              Send
            </button>
          </div>

          <div className="tutor__citations">
            <h3 className="tutor__citation-title">Sources for the answer</h3>
            <ul className="citations">
              <li className="citations__empty citations__empty--light">
                No sources yet. Answers are not being generated, so there is
                nothing to cite and nothing to verify.
              </li>
            </ul>
          </div>

          <p className="note note--warn">
            <strong>Not operational yet.</strong> The question box and Send
            button are disabled. The Grok proxy, the answer generation and the
            citation verification are all still to be built, so this panel shows
            the intended layout only — it never produces a financial answer or a
            source.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TutorPlaceholder;
