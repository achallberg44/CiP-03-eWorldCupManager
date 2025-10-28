import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton.jsx";

export default function MaxRounds() {
  const [result, setResult] = useState(null);
  const [n, setN] = useState("");

  const calculateMaxRounds = async () => {
    const response = await fetch(`http://localhost:3000/rounds/max?n=${n}`);
    const json = await response.json();
    setResult(json.maxRounds);
  };

  return (
    <>
      <div className="card">
        <div></div>
        <div>
          <h1>Max antal rundor</h1>
        </div>
        <div>
          <form id="form1">
            <label htmlFor="maxRounds">Spelare / n:</label>
            <TextField
              type="number"
              id="maxRounds"
              placeholder="Ange ett jämnt tal"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
            <br />
            <BasicButton
              type="button"
              id="btnMaxRounds"
              onClick={() => calculateMaxRounds(n)}
            >
              Max antal rundor
            </BasicButton>
          </form>
        </div>
        <div id="results2">
          {(() => {
            if (result !== null) {
              return (
                <div>
                  Max antal rundor för {n} spelare är: {result} st
                </div>
              );
            } else {
              return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}
