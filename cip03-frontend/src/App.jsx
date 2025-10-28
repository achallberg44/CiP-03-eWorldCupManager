import "./App.css";

import MatchRemaining from "./components/matchRemaining";
import WhoMeets from "./components/whoMeets";
// import { getData } from "./components/getData";

function App() {
  return (
    <>
      <div className="carddiv">
        <h1>Välkommen till eWorld Cup Manager</h1>
        <p>
          Här kan du räkna ut vem som möter vem i de olika matcherna och
          spelarna i turneringen.
        </p>

        <MatchRemaining />
      </div>
    </>
  );
}

export default App;
