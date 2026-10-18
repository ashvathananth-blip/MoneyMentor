// MoneyMentor — expanded discovery panel (AI-generated, presentation only).
//
// IMPORTANT: this is the student's existing "selectedTip" section, restyled.
// The Close button still calls the same setter that sets the selection back to
// null, so open/close behaviour is identical to the original App.jsx. Only the
// markup, layout and a11y wiring (focus + Escape) are new.

import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons.jsx";

function DiscoveryDetail({ discovery, onClose }) {
  const panelRef = useRef(null);

  // Move focus into the panel when it opens so keyboard and screen-reader
  // users land on the new content instead of staying on the card button.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: "nearest" });
  }, [discovery.id]);

  // Escape closes the panel, matching the Close button.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      id="discovery-detail"
      className="detail"
      ref={panelRef}
      tabIndex={-1}
      aria-labelledby="detail-title"
      aria-describedby="detail-desc"
    >
      <div className="detail__head">
        <span className="chip chip--onDark">{discovery.category}</span>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label={`Close ${discovery.title}`}
        >
          <CloseIcon />
        </button>
      </div>

      <h2 className="detail__title" id="detail-title">
        {discovery.title}
      </h2>
      <p className="detail__desc" id="detail-desc">
        {discovery.description}
      </p>

      <div className="detail__grid">
        <div className="detail__block">
          <h3 className="detail__block-title">
            Why This Matters
          </h3>

          {discovery.explanation ? (
            <p>{discovery.explanation}</p>
          ) : (
            <p className="placeholder">
              Detailed information is not available
              for this discovery yet.
            </p>
          )}

          {discovery.actionSteps?.length > 0 && (
            <>
              <h3 className="detail__block-title">
                What You Can Do
              </h3>

              <ol>
                {discovery.actionSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </div>

        <div className="detail__block">
          <h3 className="detail__block-title">
            Official References
          </h3>

          {discovery.sources?.length > 0 ? (
            <>
              <ul className="citations">
                {discovery.sources.map((source) => (
                  <li key={source.id}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.organization}
                      {" — "}
                      {source.title} ↗
                    </a>
                  </li>
                ))}
              </ul>

              <p className="detail__foot-note">
                These references were supplied
                to the AI as context. Individual
                claims have not been independently
                verified.
              </p>
            </>
          ) : (
            <p className="placeholder">
              No official references are available
              for this discovery yet.
            </p>
          )}
        </div>
      </div>

      <div className="detail__foot">
        <button
          type="button"
          className="btn btn--light"
          onClick={onClose}
        >
          Close
        </button>

        <p className="detail__foot-note">
          Or press Esc to close.
        </p>
      </div>
    </section>
  );
}


export default DiscoveryDetail;
