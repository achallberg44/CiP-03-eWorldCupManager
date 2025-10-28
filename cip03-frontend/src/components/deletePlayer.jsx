import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BasicButton from "./basicButton.jsx";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function DeletePlayer() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [players, setPlayers] = useState(null);
  const [deletedPlayer, setDeletedPlayer] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setPlayers(json);
    })();
  }, []);

  const handleChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const deletePlayer = async () => {
    const response = await fetch(
      `http://localhost:3000/player/${selectedPlayer}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const deletedPlayerObj = players.find(
        (player) => player.id == selectedPlayer
      );

      setDeletedPlayer(`${deletedPlayerObj.name} (ID: ${selectedPlayer})`);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <div className="players">
        <div className="card">
          <div>
            <h1>Radera en spelare</h1>
          </div>
          <div>
            <Box>
              <FormControl className="formcontrol" fullWidth>
                <label htmlFor="addPlayer">Välj spelare:</label>
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
                <BasicButton
                  color="error"
                  sx={{
                    background: "#d32f2f",
                    "&:hover": {
                      background: "#b71c1c",
                      transform: "translateY(-2px)",
                    },
                  }}
                  onClick={() => deletePlayer(selectedPlayer)}
                >
                  Ta bort spelare
                </BasicButton>
              </FormControl>
            </Box>
          </div>
          <div id="results2">
            {(() => {
              if (deletedPlayer !== null) {
                return <div>Raderad spelare: {deletedPlayer}</div>;
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
