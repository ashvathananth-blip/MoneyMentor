// MoneyMentor — original inline icon set.
// Every glyph is hand-drawn SVG path data using `currentColor`, so no icon
// library or extra dependency is needed. Decorative icons are hidden from
// assistive tech; interactive ones are labelled by their parent button.

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function LogoMark() {
  return (
    <svg {...baseProps} strokeWidth={2.2}>
      <path d="M4 18.5V7l8 7 8-7v11.5" />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg {...baseProps} className="icon">
      <path d="M4.5 12h14" />
      <path d="M12.5 6l6 6-6 6" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg {...baseProps} strokeWidth={2}>
      <path d="M6.5 6.5l11 11" />
      <path d="M17.5 6.5l-11 11" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg {...baseProps} strokeWidth={2}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CompassIcon() {
  return (
    <svg {...baseProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.4 8.6l-1.9 5-5 1.9 1.9-5z" />
    </svg>
  );
}

export function TargetIcon() {
  return (
    <svg {...baseProps}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg {...baseProps}>
      <path d="M12 3.8l1.85 4.9 4.9 1.85-4.9 1.85L12 17.3l-1.85-4.9L5.25 10.55l4.9-1.85z" />
      <path d="M18.4 16.4l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg {...baseProps}>
      <path d="M6.5 3.5h7.2l4.3 4.3v12.7H6.5z" />
      <path d="M13.5 3.5v4.5h4.5" />
      <path d="M9.5 13h6" />
      <path d="M9.5 16.5h4" />
    </svg>
  );
}
