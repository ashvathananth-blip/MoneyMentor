// MoneyMentor — homepage hero (AI-generated).
// The headline and sub-copy are the wording specified by the student; the
// student owns this copy. The illustration is an abstract, original SVG: no
// invented statistics, testimonials or chart data appear anywhere in it.

import { ArrowRight } from "./icons.jsx";

function Hero({ categories }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Financial discovery for teenagers</p>
          <h1 className="hero__title">
            Discover the money opportunities nobody told you about.
          </h1>
          <p className="lede">
            MoneyMentor surfaces the opportunities most people miss — so you can
            spot the hidden catches for yourself and build practical money
            skills you can actually use.
          </p>

          <div className="hero__actions">
            <a className="btn btn--accent" href="#discover">
              Explore discoveries
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#tutor">
              Ask the Tutor
              <span className="badge badge--soon">Soon</span>
            </a>
          </div>

          {/* Derived from discoveries.js, so this stays accurate as the data
              grows. No hard-coded counts or claims. */}
          {categories.length > 0 && (
            <div className="hero__meta">
              <span>Covers</span>
              <ul className="hero__meta-dots">
                {categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="hero__art">
          <svg viewBox="0 0 440 360" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="mmCard" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#071a33" />
                <stop offset="1" stopColor="#1d4478" />
              </linearGradient>
              <linearGradient id="mmLine" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#2b6cff" />
                <stop offset="1" stopColor="#8fb0ff" />
              </linearGradient>
              <linearGradient id="mmTile" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4a83ff" />
                <stop offset="1" stopColor="#1c50d8" />
              </linearGradient>
            </defs>

            {/* back card */}
            <rect
              x="30"
              y="30"
              width="330"
              height="246"
              rx="26"
              fill="#ffffff"
              stroke="#dde5f0"
            />

            {/* front navy discovery card */}
            <rect
              x="76"
              y="70"
              width="340"
              height="248"
              rx="26"
              fill="url(#mmCard)"
            />
            <rect
              x="104"
              y="100"
              width="96"
              height="26"
              rx="13"
              fill="rgba(255,255,255,0.16)"
            />
            <rect
              x="104"
              y="144"
              width="200"
              height="13"
              rx="6.5"
              fill="rgba(255,255,255,0.5)"
            />
            <rect
              x="104"
              y="165"
              width="132"
              height="10"
              rx="5"
              fill="rgba(255,255,255,0.26)"
            />

            {/* abstract growth line — decorative, not a real chart */}
            <polyline
              points="104,286 158,254 206,266 258,220 312,234 372,190"
              fill="none"
              stroke="url(#mmLine)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="372" cy="190" r="13" fill="rgba(143,176,255,0.35)" />
            <circle cx="372" cy="190" r="7" fill="#ffffff" />
            <circle cx="104" cy="286" r="5" fill="rgba(255,255,255,0.7)" />

            {/* floating accent tile */}
            <rect
              x="18"
              y="268"
              width="70"
              height="70"
              rx="20"
              fill="url(#mmTile)"
            />
            <circle
              cx="53"
              cy="303"
              r="16"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.6"
            />
            <path
              d="M59.5 296.5l-4.5 7.5-7.5 4.5 4.5-7.5z"
              fill="#ffffff"
            />

            {/* floating white marker */}
            <circle
              cx="404"
              cy="60"
              r="22"
              fill="#ffffff"
              stroke="#dde5f0"
            />
            <path
              d="M404 50.5l2.6 6.9 6.9 2.6-6.9 2.6-2.6 6.9-2.6-6.9-6.9-2.6 6.9-2.6z"
              fill="#2b6cff"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
