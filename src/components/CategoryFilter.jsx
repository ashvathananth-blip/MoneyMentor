// MoneyMentor — category selector interface (AI-generated, PLACEHOLDER ONLY).
//
// This is the visual interface for category filtering, as requested for today's
// frontend task. It intentionally contains NO filtering or ranking logic:
// selecting a chip updates the highlighted state in App.jsx and nothing else.
// The button/selection seam below is where the student's own filtering and
// source-ranking code is expected to connect.

function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="filters" id="categories">
      <h3 className="sr-only" id="categories-title">
        Browse discoveries by category
      </h3>

      <ul className="filter-list" aria-labelledby="categories-title">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className="filter-chip"
              aria-pressed={category === activeCategory}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <p className="filters__note">
        Filtering is not wired up yet — every discovery is listed while the
        discovery engine is being built.
      </p>
    </div>
  );
}

export default CategoryFilter;
