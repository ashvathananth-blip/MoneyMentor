// MoneyMentor — discovery card (AI-generated, presentation only).
// Renders only the fields the student already stores in discoveries.js
// (category, title, description) and calls the onExplore callback that
// App.jsx passes down. The Explore/Close data flow is unchanged.

import { ArrowRight } from "./icons.jsx";

function DiscoveryCard({ discovery, onExplore, isActive }) {
  return (
    <article className="card">
      <span className="chip">{discovery.category}</span>
      <h3 className="card__title">{discovery.title}</h3>
      <p className="card__desc">{discovery.description}</p>

      <div className="card__foot">
        <span className="card__hint">Tap to read more</span>
        <button
          type="button"
          className="card__explore"
          onClick={() => onExplore(discovery)}
          aria-expanded={isActive}
          aria-controls="discovery-detail"
        >
          {isActive ? "Open" : "Explore"}
          <ArrowRight />
        </button>
      </div>
    </article>
  );
}

export default DiscoveryCard;
