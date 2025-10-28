import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton.jsx";

export default function AddPlayer() {
  const [result, setResult] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");

  const addNewPlayer = async () => {
    const response = await fetch(`http://localhost:3000/player`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newPlayer }),
    });
    const json = await response.json();
    setResult(json.name);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="players">
        <div className="card">
          <div>
            <h1>Lägg till en spelare</h1>
          </div>
          <div>
            <form id="form1">
              <label htmlFor="addPlayer">Ange spelarens namn:</label>
              <TextField
                type="string"
                id="addPlayer"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
              />
              <br />
              <BasicButton
                color="success"
                sx={{
                  background: "#2e7d32",
                  "&:hover": {
                    background: "#1b5e20",
                    transform: "translateY(-2px)",
                  },
                }}
                type="button"
                id="btnAddPlayer"
                onClick={() => addNewPlayer()}
              >
                Lägg till spelare
              </BasicButton>
            </form>
          </div>
          <div id="results2">
            {(() => {
              if (result !== null) {
                return <div>Spelare tillagd: {result}</div>;
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
