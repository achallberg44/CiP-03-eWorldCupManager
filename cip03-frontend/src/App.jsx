import "./App.css";

import MatchRemaining from "./components/matchRemaining";
// import { getData } from "./components/getData";
import GetOpponent from "./components/getOpponent";

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
