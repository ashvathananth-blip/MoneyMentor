// MoneyMentor — footer (AI-generated).

import { LogoMark } from "./icons.jsx";

const FOOTER_LINKS = [
  { label: "Discover", href: "#discover" },
  { label: "Categories", href: "#categories" },
  { label: "Spot the Catch", href: "#spot-the-catch" },
  { label: "Ask the Tutor", href: "#tutor" },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <a className="brand brand--footer" href="#top">
            <span className="brand__mark">
              <LogoMark />
            </span>
            <span className="brand__name">MoneyMentor</span>
          </a>

          <ul className="site-footer__links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <p className="site-footer__note">
          MoneyMentor is a student-built financial discovery project for
          EurekaDev 2026. This interface is a work in progress: the Grok tutor,
          citation verification, category filtering and Spot the Catch scenarios
          are not operational yet. AI-assisted interface design is documented in
          AI_USAGE.md.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
