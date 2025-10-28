import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BasicButton from "./basicButton";

export default function BasicSelect() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [result, setResult] = useState([]);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setResult(json);
    })();
  }, []);

  const handleChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const getMatchup = async (selectedPlayerValue) => {
    // Hitta spelarens index i arrayen baserat på ID
    const playerIndex = result.findIndex(
      (player) => player.id == selectedPlayerValue
    );

    const response = await fetch(
      `http://localhost:3000/player/${playerIndex}/schedule`
    );
    const matches = await response.json();
    setMatchData(matches);
    return matches;
  };

  return (
    <div className="card">
      <h1>Se alla matcher för en specifik spelare</h1>
      <Box>
        <FormControl className="formcontrol" fullWidth>
          <InputLabel id="dropdown-label">Välj spelare</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedPlayer}
            label="Välj spelare"
            onChange={handleChange}
            sx={{
              "& .MuiSelect-select": {
                textAlign: "center",
              },
            }}
          >
            {result.map((player, idx) => (
              <MenuItem key={idx} value={player.value || player.id || idx}>
                {player.name || player.label || player.toString()}
              </MenuItem>
            ))}
          </Select>
          <BasicButton onClick={() => getMatchup(selectedPlayer)}>
            Se spelarens alla rundor
          </BasicButton>
        </FormControl>
      </Box>

      <div className="result">
        {matchData && (
          <div>
            <h3>Matcher för {matchData.player.name}:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {matchData.schedule.map((round, index) => (
                <li key={index}>
                  <strong>Match {index + 1}: </strong>
                  {round.opponent.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
