import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton.jsx";

export default function MatchRemaining() {
  const [result, setResult] = useState(null);
  const [n, setN] = useState("");
  const [D, setD] = useState("");

  const calculateRemainingMatches = async () => {
    const response = await fetch(
      `http://localhost:3000/match/remaining?n=${n}&D=${D}`
    );
    const json = await response.json();
    setResult(json);
  };

  return (
    <>
      <div className="card">
        <div>
          <h1>Kvarvarande matcher</h1>
          <p>
            Nedan kan du räkna ut hur många rundor som är kvar efter D spelade
            med N antal spelare
          </p>
        </div>
        <div>
          <form id="form">
            <label htmlFor="userInput">Spelare/n:</label>
            <TextField
              id="n"
              placeholder="Ange ett jämnt tal"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
            <br />
            <label htmlFor="D">Rundor/d:</label>
            <TextField
              id="D"
              placeholder="Ange antal rundor"
              value={D}
              onChange={(e) => setD(e.target.value)}
            />
            <BasicButton type="button" onClick={calculateRemainingMatches}>
              Round Robin
            </BasicButton>
          </form>
        </div>
        <h2 id="resultH2"></h2>
        <div id="results">
          <div>
            {(() => {
              if (result !== null) {
                return (
                  <div>
                    <p>Antal spelare: {n}</p>
                    <p>Antal spelade matcher: {D}</p>
                    <h4>Antal unika matcher kvar: {result.pairsLeft}</h4>
                  </div>
                );
              } else {
                return null;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
