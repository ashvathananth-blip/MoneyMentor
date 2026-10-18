// MoneyMentor — homepage composition root.
//
// PRESERVED FROM THE ORIGINAL APP.JSX
//   • `selectedTip` state and the `setSelectedTip(tip)` / `setSelectedTip(null)`
//     calls that power the Explore and Close buttons.
//   • `discoveries` imported from ./data/discoveries.js and mapped into a list.
//   • The overview heading "Discover Financial Opportunities".
//
// AI-GENERATED IN THIS FILE
//   • The section layout, the navbar/hero/footer composition, and the
//     `activeCategory` UI state for the category chip row.

import { useState } from "react";
import { discoveries } from "./data/discoveries.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import DiscoveryCard from "./components/DiscoveryCard.jsx";
import DiscoveryDetail from "./components/DiscoveryDetail.jsx";
import SpotTheCatch from "./components/SpotTheCatch.jsx";
import AITutor from "./components/AITutor.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

// The subject areas MoneyMentor is meant to cover. These are the labels for the
// category selector; only the ones present in discoveries.js currently have
// cards behind them.
const SKILL_AREAS = [
  "All",
  "College",
  "Credit",
  "Banking",
  "Investing",
  "Employment",
];

function App() {
  // Unchanged from the original app: which discovery is expanded, or null.
  const [selectedTip, setSelectedTip] = useState(null);

  // Presentation state for the category chips only. It highlights a chip; it
  // does not change which discoveries are listed. See the note below.
  const [activeCategory, setActiveCategory] = useState("All");

  // Derived from the data so the hero never claims a category that has no
  // content behind it.
  const categories = [...new Set(discoveries.map((tip) => tip.category))];

  // ==========================================================================
  // STUDENT LAYER — discovery filtering and ranking
  // --------------------------------------------------------------------------
  // This passes the full list straight through, because filtering and
  // source-ranking are the student's own features to build. Replace this with
  // your own logic (using `activeCategory`) when it is ready — every card below
  // already re-renders from whatever this array contains.
  // ==========================================================================
  const visibleDiscoveries = discoveries;

  return (
    <>
      <a className="skip-link" href="#discover">
        Skip to discoveries
      </a>

      <Navbar />

      <main>
        <Hero categories={categories} />

        <section className="section" id="discover" aria-labelledby="discover-title">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Discover</p>
              <h2 className="section__title" id="discover-title">
                Discover Financial Opportunities
              </h2>
              <p className="section__lede">
                Each card opens up to show what a topic covers. Tap Explore to
                open one.
              </p>
            </div>

            <CategoryFilter
              categories={SKILL_AREAS}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            <div className="card-grid">
              {visibleDiscoveries.map((tip) => (
                <DiscoveryCard
                  key={tip.id}
                  discovery={tip}
                  onExplore={setSelectedTip}
                  isActive={selectedTip?.id === tip.id}
                />
              ))}
            </div>

            {/* The original app rendered this section directly below the list,
                and only one discovery can be open at a time. Both behaviours
                are unchanged. */}
            {selectedTip && (
              <DiscoveryDetail
                discovery={selectedTip}
                onClose={() => setSelectedTip(null)}
              />
            )}
          </div>
        </section>

        <SpotTheCatch />
        <AITutor />
      </main>

      <Footer />
    </>
  );
}

export default App;
