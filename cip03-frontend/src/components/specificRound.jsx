import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

export default function RoundsLeft() {
  const [result, setResult] = useState(null);
  const [D, setD] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setAllPlayers(json);
    })();
  }, []);

  const calculateSpecificRound = async () => {
    if (D > allPlayers.length) {
      alert("Det är för få spelare för så många rundor");
      return;
    } else {
      const response = await fetch(`http://localhost:3000/rounds/${D}`);
      const json = await response.json();
      setResult(json);
    }
  };

  return (
    <>
      <div className="card">
        <div>
          <h1>Visa specifik runda</h1>
        </div>
        <div>
          <form id="form1">
            <p>
              Det är totalt {allPlayers.length + 1} spelare, alltså{" "}
              {allPlayers.length} matcher totalt
            </p>
            <label htmlFor="roundsLeftD">Round / D:</label>
            <TextField
              id="roundsLeftD"
              placeholder="Enter an even number"
              value={D}
              onChange={(e) => setD(e.target.value)}
            />
            <BasicButton
              type="button"
              id="btnRoundsLeft"
              onClick={calculateSpecificRound}
            >
              Visa vald runda
            </BasicButton>
          </form>
        </div>
        <div id="results3">
          {result && (
            <div>
              <h4>Matcher för runda {result.round}:</h4>
              <List>
                {result.matches.map((match, index) => (
                  <ListItemText key={index} primary={match.match} />
                ))}
              </List>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
