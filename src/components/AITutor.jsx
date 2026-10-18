// MoneyMentor — Ask MoneyMentor AI.
//
// LOGIC IS STUDENT-WRITTEN AND PRESERVED
//   • The question / answer / loading / error state.
//   • The POST to the local proxy at /api/ask.
//
// AI-GENERATED IN THIS REVISION
//   • The section shell (.section + .wrap + .section__head) so the tutor uses
//     the same layout, headings and panel styling as the rest of the page.
//   • The bouncing-dots <ThinkingDots /> indicator used while waiting.
//   • The answer / error presentation classes.
// No grading, filtering, recommendation or source-verification logic was added:
// the response's `sources` and `verified` fields are still ignored.

import { useState } from "react";
import { SparkIcon } from "./icons.jsx";

// The answer is rendered verbatim (plain text, no Markdown parser), and the
// model still occasionally wraps labels in **bold** or starts a line with #
// despite the plain-text instruction in the system prompt. Those markers would
// show up as literal characters, so the display copy has the few that appear in
// practice stripped out. Presentation only — the wording is not altered.
function toPlainText(text) {
  return text
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ThinkingDots() {
  return (
    <span className="thinking" aria-hidden="true">
      <span className="thinking__dot" />
      <span className="thinking__dot" />
      <span className="thinking__dot" />
    </span>
  );
}

export default function AITutor() {
  
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askMoneyMentor(event) {
    event.preventDefault();

    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setSources([]);
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(toPlainText(data.answer || "No answer returned."));
      setSources(Array.isArray(data.sources) ? data.sources : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to contact the AI."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section" id="tutor" aria-labelledby="tutor-title">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">Ask the Tutor</p>
          <h2 className="section__title" id="tutor-title">
            Ask MoneyMentor AI
          </h2>
          <p className="section__lede">
            Explore financial concepts, opportunities and risks with an
            AI-powered tutor, then check the official sources before you act on
            anything.
          </p>
        </div>

        <div className="tutor__panel">
          <form className="tutor__row" onSubmit={askMoneyMentor}>
            <label className="sr-only" htmlFor="tutor-question">
              Ask a financial question
            </label>
            <textarea
              className="tutor__input"
              id="tutor-question"
              name="tutor-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Can I build credit before 18?"
              maxLength={1000}
              required
            />

            <button
              type="submit"
              className={
                loading ? "btn btn--accent is-thinking" : "btn btn--accent"
              }
              aria-busy={loading}
              disabled={loading || !question.trim()}
            >
              {loading ? (
                <>
                  <ThinkingDots />
                  <span className="sr-only">Thinking</span>
                </>
              ) : (
                <>
                  <SparkIcon />
                  Ask AI
                </>
              )}
            </button>
          </form>

          <p className="note ai-tutor__hint">
            Answers are AI-generated and source verification is not enabled yet.
            Check official sources before relying on financial rules or
            eligibility details.
          </p>

          {/* Announces the pending state for screen readers; the visible dots
              are decorative and already hidden from the accessibility tree. */}
          <p className="sr-only" role="status">
            {loading ? "MoneyMentor is thinking." : ""}
          </p>

          {error && (
            <p role="alert" className="ai-error">
              {error}
            </p>
          )}


          <div className="ai-response" aria-live="polite">
            {answer && (
              <>
                <h3 className="ai-response__title">
                  MoneyMentor explains
                </h3>

                <p className="ai-response__body">
                  {answer.replace(/\[\d+\]/g, "").trim()}
                </p>
              </>
            )}
          </div>

          {sources.length > 0 && (
            <section className="ai-sources">
              <h3>Official References</h3>
              <p>AI responses may have error, please check the real 
                source to make sure information provided is correct</p>

              <div className="ai-source-list">
                {sources.map((source) => (
                  <a
                    key={source.id}
                    className="ai-source-card"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <strong>{source.title}</strong>
                      <span>{source.organization}</span>
                    </div>

                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>

              <p className="note ai-source-note">
                These references were supplied to the AI as
                context. Individual claims have not been
                independently verified.
              </p>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

