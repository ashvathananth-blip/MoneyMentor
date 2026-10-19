// MoneyMentor — "Spot the Catch" interface placeholder (AI-generated).
// Interface only. No scenarios, scoring, feedback or financial-decision logic
// exist here; the Start button is disabled and labelled as not built yet.


import { useState } from "react";

export default function SpotTheCatch() {
  const [scenario, setScenario] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startScenario() {
    setLoading(true);
    setError("");
    setSelected(null);
    setScenario(null);

    try {
      const response = await fetch("/api/scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load scenario."
        );
      }

      setScenario(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const answered = selected !== null;
  const correct =
    answered &&
    selected === scenario?.correctIndex;

  return (
    <section
      className="section"
      id="spot-the-catch"
      aria-labelledby="catch-title"
    >
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">Interactive Learning</p>
          <h2
            className="section__title"
            id="catch-title"
          >
            Spot the Catch
          </h2>
          <p className="section__lede">
            Test your financial decision-making skills
            with realistic AI-generated scenarios.
          </p>
        </div>

        {!scenario && (
          <button
            type="button"
            className="btn btn--accent"
            onClick={startScenario}
            disabled={loading}
          >
            {loading
              ? "Generating Scenario..."
              : "Start Scenario"}
          </button>
        )}

        {error && (
          <p className="ai-error" role="alert">
            {error}
          </p>
        )}

        {scenario && (
          <div
            className="scenario-panel"
            style={{
              maxWidth: 760,
              padding: 24,
              border: "1px solid #7775",
              borderRadius: 16,
              marginTop: 20
            }}
          >
            <p className="eyebrow">Financial Challenge</p>
            <h3>{scenario.title}</h3>

            <p>{scenario.scenario}</p>

            <h4 style={{ marginTop: 22 }}>
              {scenario.question}
            </h4>

            <div
              style={{
                display: "grid",
                gap: 12,
                marginTop: 16
              }}
            >
              {scenario.options.map((option, index) => {
                const isCorrect =
                  index === scenario.correctIndex;
                const isChosen = selected === index;

                let borderColor = "var(--line, #8886)";

                if (answered && isCorrect) {
                  borderColor = "#22a06b";
                } else if (answered && isChosen) {
                  borderColor = "#d45454";
                }

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={answered}
                    onClick={() => setSelected(index)}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      background: "transparent",
                      color: "inherit",
                      border: `2px solid ${borderColor}`,
                      borderRadius: 10,
                      cursor: answered
                        ? "default"
                        : "pointer"
                    }}
                  >
                    {String.fromCharCode(65 + index)}.{" "}
                    {option}
                    {answered && isCorrect && " ✓"}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div
                role="status"
                style={{ marginTop: 24 }}
              >
                <h4>
                  {correct
                    ? "Correct! Great decision."
                    : "Not quite! Here's why."}
                </h4>

                <p>{scenario.explanation}</p>

                {scenario.source && (
                  <p>
                    Official reference:{" "}
                    <a
                      href={scenario.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {scenario.source.title}
                    </a>
                  </p>
                )}

                <p className="note">
                  AI-generated exercise based on a
                  reference summary. Not independently
                  verified against the live webpage.
                </p>

                <button
                  type="button"
                  className="btn btn--accent"
                  onClick={startScenario}
                  disabled={loading}
                >
                  {loading
                    ? "Generating..."
                    : "Try Another Scenario"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
