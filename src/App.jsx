import { useState } from "react";
import { discoveries } from "./data/discoveries.js";
import "./App.css";








function App() {
  
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <main>
      
          <h1>Money Mentor</h1>
          <p>
            Discover financial tips and skills to prepare
        yourself for the future.
          </p>
          <h2>Discover Financial Opportunities</h2>
          {discoveries.map((tip) => (
        <div key={tip.id}>
          <h3>{tip.title}</h3>
          <p>{tip.description}</p>

          <button onClick={() => setSelectedTip(tip)}>
            Explore
          </button>
        </div>
      ))}

      {selectedTip && (
        <section>
          <h2>{selectedTip.title}</h2>
          <p>{selectedTip.description}</p>

          <button onClick={() => setSelectedTip(null)}>
            Close
          </button>
        </section>
      )}
    </main>
  );
}

export default App;