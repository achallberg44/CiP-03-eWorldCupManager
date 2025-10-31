import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton.jsx";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ValjSpelare from "../pages/valjSpelare.jsx";

export default function GetOpponent() {
  const [matchResult, setMatchResult] = useState(null);
  const [d, setD] = useState("");
  const [players, setPlayers] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setPlayers(json);
      console.log("Spelare hämtade:", json);
    })();
  }, []);

  const handleChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const calculateWhoMeets = async () => {

    const response = await fetch(
      `http://localhost:3000/player/${selectedPlayer}/round/${d}`
    );

    if (!response.ok) {
      console.error("HTTP fel:", response.status, response.statusText);
      return;
    }
    const json = await response.json();
    setMatchResult(json);
    console.log(json);
  };

  return (
    <>
      <div className="card">
        <div>
          <h1>Se motståndare</h1>
        </div>
        <div>
          <form id="form1">
            <br />
            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Välj spelare</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedPlayer}
                label="Välj spelare"
                onChange={handleChange}
                sx={{
                  width: "100%",
                  "& .MuiSelect-select": {
                    textAlign: "center",
                  },
                }}
              >
                {players &&
                  players.map((player, idx) => (
                    <MenuItem
                      key={idx}
                      value={player.value || idx}
                    >
                     <strong>{player.name}</strong> (ID: {player.id})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <label htmlFor="whoMeetsi">(Spelarindex) i:</label>
            {/* <TextField
              id="whoMeetsi"
              placeholder="Enter an even number"
              value={i}
              onChange={(e) => setI(e.target.value)}
            /> */}
            <br />
            <label htmlFor="whoMeetsD">(Numret på specifik runda) d:</label>
            <TextField
              id="whoMeetsD"
              placeholder="Enter an even number"
              value={d}
              onChange={(e) => setD(e.target.value)}
            />
            <BasicButton
              type="button"
              id="btnWhoMeets"
              onClick={calculateWhoMeets}
            >
              Vem möter vem?
            </BasicButton>
          </form>
        </div>
        <div id="results4">
          {(() => {
            if (matchResult !== null) {
              return (
                <div>
                  <h4>
                    Resultat: {matchResult.player.name} (ID: {matchResult.player.id}) <strong>vs.</strong>{" "}
                    {matchResult.opponent.name} (ID: {matchResult.opponent.id})
                  </h4>
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
