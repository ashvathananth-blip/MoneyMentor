
import { useState } from "react";

export default function AITutor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askMoneyMentor(event) {
    event.preventDefault();

    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      setAnswer(data.answer || "No answer returned.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to contact the AI."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-tutor">
      <h2>Ask MoneyMentor AI</h2>

      <p>
        Explore financial concepts, opportunities,
        and risks with an AI-powered tutor.
      </p>

      <form onSubmit={askMoneyMentor}>
        <input
          type="text"
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Can I build credit before 18?"
          maxLength={1000}
          aria-label="Ask a financial question"
          required
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {error && (
        <p role="alert" className="ai-error">
          {error}
        </p>
      )}

      {answer && (
        <div className="ai-response" aria-live="polite">
          <h3>MoneyMentor explains</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {answer}
          </p>

          <small>
            AI-generated educational information.
            Source verification is not yet enabled.
            Check official sources before relying
            on financial rules or eligibility details.
          </small>
        </div>
      )}
    </section>
  );
}
