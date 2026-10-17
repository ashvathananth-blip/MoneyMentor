// MoneyMentor — navigation bar (AI-generated).
// Visual shell only: the links are in-page anchors to existing/placeholder
// sections. No routing library and no new dependency were added.

import { useEffect, useState } from "react";
import { LogoMark, MenuIcon, CloseIcon, ArrowRight } from "./icons.jsx";

const NAV_LINKS = [
  { label: "Discover", href: "#discover" },
  { label: "Categories", href: "#categories" },
  { label: "Spot the Catch", href: "#spot-the-catch" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Mobile sheet closes on Escape. Only wired up while the sheet is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand__mark">
            <LogoMark />
          </span>
          <span className="brand__name">MoneyMentor</span>
        </a>

        <nav
          id="primary-nav"
          className={isOpen ? "site-nav is-open" : "site-nav"}
          aria-label="Primary"
        >
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className="site-nav__link" href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="btn btn--accent btn--sm site-nav__cta"
                href="#tutor"
                onClick={close}
              >
                Ask the Tutor
                <ArrowRight />
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
