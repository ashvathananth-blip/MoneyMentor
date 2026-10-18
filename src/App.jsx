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
import { useEffect, useRef, useState } from "react";
import { discoveries as fallbackDiscoveries } from "./data/discoveries.js";
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
  const [discoveries, setDiscoveries] = useState(fallbackDiscoveries);
  const [previousTitles, setPreviousTitles] = useState([]);
  const [previousSourceIds, setPreviousSourceIds] = useState([]);
  const [loadingDiscoveries, setLoadingDiscoveries] = useState(false);
  const [discoveryError, setDiscoveryError] = useState("");
  const initialLoadStarted = useRef(false);

  async function loadDiscoveries(
    titlesToAvoid = [],
    sourceIdsToAvoid = []
  ) {
    setLoadingDiscoveries(true);
    setDiscoveryError("");

    try {
      const response = await fetch("/api/discover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previousTitles: titlesToAvoid,
          previousSourceIds: sourceIdsToAvoid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate discoveries."
        );
      }

      if (
        !Array.isArray(data.discoveries) ||
        data.discoveries.length === 0
      ) {
        throw new Error("No discoveries were returned.");
      }

      const newDiscoveries = data.discoveries;

      setDiscoveries(newDiscoveries);

      setPreviousSourceIds((existing) => [
        ...new Set([
          ...existing,
          ...newDiscoveries.flatMap((item) =>
            (item.sources || []).map((source) => source.id)
          ),
        ]),
      ]);

      setPreviousTitles((existing) => [
        ...existing,
        ...newDiscoveries.map((item) => item.title),
      ]);

      setSelectedTip(null);
      setActiveCategory("All");
    } catch (error) {
      setDiscoveryError(
        error instanceof Error
          ? error.message
          : "Unable to generate discoveries."
      );
    } finally {
      setLoadingDiscoveries(false);
    }
  }

  useEffect(() => {
    if (initialLoadStarted.current) return;

    initialLoadStarted.current = true;
    loadDiscoveries([]);
  }, []);

  const categories = [
    ...new Set(discoveries.map((tip) => tip.category)),
  ];

  const visibleDiscoveries =
    activeCategory === "All"
      ? discoveries
      : discoveries.filter(
          (tip) => tip.category === activeCategory
        );

  function handleDiscoverMore() {
    loadDiscoveries(previousTitles, previousSourceIds);
  }

  return (
    <>
      <a className="skip-link" href="#discover">
        Skip to discoveries
      </a>

      <Navbar />

      <main>
        <Hero categories={categories} />

        <section
          className="section"
          id="discover"
          aria-labelledby="discover-title"
        >
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Discover</p>

              <h2
                className="section__title"
                id="discover-title"
              >
                Discover Financial Opportunities
              </h2>

              <p className="section__lede">
                Explore financial opportunities, uncover
                overlooked benefits, and learn practical
                money skills.
              </p>
            </div>

            <CategoryFilter
              categories={SKILL_AREAS}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {loadingDiscoveries && (
              <p className="note" role="status">
                Finding financial discoveries...
              </p>
            )}

            {discoveryError && (
              <p className="ai-error" role="alert">
                {discoveryError}
                {discoveries === fallbackDiscoveries
                  ? " Showing starter discoveries instead."
                  : " You can keep exploring the current cards."}
              </p>
            )}

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

            {visibleDiscoveries.length === 0 && (
              <p className="note">
                No discoveries in this category yet.
                Try another category.
              </p>
            )}

            {selectedTip && (
              <DiscoveryDetail
                discovery={selectedTip}
                onClose={() => setSelectedTip(null)}
              />
            )}

            <div className="discover-more">
              <button
                type="button"
                className="btn btn--accent"
                onClick={handleDiscoverMore}
                disabled={loadingDiscoveries}
              >
                {loadingDiscoveries
                  ? "Generating..."
                  : "Discover More"}
              </button>
            </div>
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