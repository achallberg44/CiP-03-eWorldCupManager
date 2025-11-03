import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import BasicButton from "./basicButton.jsx";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import ValjSpelare from "../pages/valjSpelare.jsx";

export default function WhoMeets() {
  const [matchResult, setMatchResult] = useState(null);
  const [n, setN] = useState("");
  const [i, setI] = useState("");
  const [d, setD] = useState("");
  const [players, setPlayers] = useState(null);
  // const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setPlayers(json);
      console.log("Spelare hämtade:", json);
    })();
  }, []);

  // const handleChange = (event) => {
  //   setSelectedPlayer(event.target.value);
  // };

  const calculateWhoMeets = async () => {
    // const i = selectedPlayer - 1;
    const response = await fetch(
      `http://localhost:3000/match?n=${n}&i=${i}&d=${d}`
    );

    if (!response.ok) {
      console.error("HTTP fel:", response.status, response.statusText);
      return;
    }
    const json = await response.json();
    setMatchResult(json);
  };

  return (
    <>
      <div className="card">
        <div>
          <h1>Vem möter vald spelare</h1>
          <p>
            OBS, det är {players ? players.length + 1 : "..."} spelare
            tillgängliga.
          </p>
        </div>
        <div>
          <form id="form1">
            <label htmlFor="whoMeets">(Antal spelare) n:</label>
            <TextField
              id="whoMeets"
              placeholder="Enter an even number"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
            <br />
            {/* <FormControl fullWidth>
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
                      value={player.value || player.id || idx}
                    >
                      {player.name || player.label || player.toString()}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <label htmlFor="whoMeetsi">(Spelarindex) i:</label>
            <TextField
              id="whoMeetsi"
              placeholder="Enter an even number"
              value={i}
              onChange={(e) => setI(e.target.value)}
            />
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
                    Resultat: {matchResult.player.name} <strong>vs.</strong>{" "}
                    {matchResult.opponent.name}
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
