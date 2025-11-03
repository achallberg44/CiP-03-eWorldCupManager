const express = require("express");
const cors = require("cors"); //för att ej få corsfel
const fs = require("fs");
const path = require("path");
const allPlayers = require("./data/allPlayers.json");
const app = express();
const port = 3000;

app.use(express.json());
// CORS-konfiguration (tillåter alla)
app.use(cors());

app.get("/getplayers", (req, res) => {
  res.json(allPlayers);
});

//GET	/rounds/max?n=
app.get("/rounds/max", (req, res) => {
  const n = parseInt(req.query.n);
  let maxRounds = n - 1;
  res.json({
    maxRounds: maxRounds,
  });
});

//GET	/rounds/:d
app.get("/rounds/:d", (req, res) => {
  const d = parseInt(req.params.d);
  const players = allPlayers;
  const n = players.length;

  //Fixerar en spelare och slicear så att de andra kan roteras
  const fixed = players[0];
  let others = players.slice(1);

  //Antal steg för vald runda, rotationen av listan och ihopsättning av den nya listan
  const steps = d - 1;
  const rotated = others.slice(steps).concat(others.slice(0, steps));

  //Rotera för att skapa korrekta matchningarna, pusha in i array matches
  const matches = [];
  matches.push([fixed, rotated[0]]);
  for (let i = 1; i < n / 2; i++) {
    matches.push([rotated[i], rotated[rotated.length - i]]);
  }

  // Skapa JSON-objekt för matchningarna
  const matchResults = [];
  for (let j = 0; j < matches.length; j++) {
    matchResults.push({
      player1: matches[j][0].name,
      player2: matches[j][1].name,
      match: `${matches[j][0].name} vs ${matches[j][1].name}`,
    });
  }

  res.json({
    round: d,
    totalPlayers: n,
    matches: matchResults,
    matchCount: matches.length,
  });
});

// GET /player/:i/round/:d
// Alias till /match, men med namn/objekt
app.get("/player/:i/round/:d", (req, res) => {
  const i = parseInt(req.params.i);
  const d = parseInt(req.params.d);

  const n = allPlayers.length;

  if (isNaN(n) || isNaN(i) || isNaN(d)) {
    return res
      .status(400)
      .json({ error: "Parametrar i och d måste vara nummer" });
  }

  if (i >= n || i < 0) {
    return res
      .status(400)
      .json({ error: "Spelare index i måste vara mellan 0 och n-1" });
  }

  if (d < 1 || d >= n) {
    return res
      .status(400)
      .json({ error: "Runda d måste vara mellan 1 och n-1" });
  }

  const players = allPlayers.slice(0, n);

  const fixed = players[0];
  let others = players.slice(1);

  const steps = d - 1;
  const rotated = others.slice(steps).concat(others.slice(0, steps));

  const matches = [];
  matches.push([fixed, rotated[0]]);

  for (let j = 1; j < n / 2; j++) {
    matches.push([rotated[j], rotated[rotated.length - j]]);
  }

  const selectedPlayer = players[i];
  let opponent = null;

  for (let match of matches) {
    if (match[0].id === selectedPlayer.id) {
      opponent = match[1];
      break;
    } else if (match[1].id === selectedPlayer.id) {
      opponent = match[0];
      break;
    }
  }
 ///SNABB DEBUG för att se så id och index av val stämmer
console.log("DEBUG i =", i);
console.log("selectedPlayer =", selectedPlayer);
console.log("allPlayers =", allPlayers.map(p => p.name));

res.json({
  player: { id: selectedPlayer.id, name: selectedPlayer.name },
  round: d,
  opponent: { id: opponent.id, name: opponent.name },
});
});

//GET	/match/remaining?n=&D=
app.get("/match/remaining", (req, res) => {
  const n = parseInt(req.query.n);
  const D = parseInt(req.query.D);
  console.log("n:", n);
  console.log("D:", D);
  let pairs = (n * (n - 1)) / 2; //antal par
  let pairsPerRounds = D * (n / 2); //antal par som spelar mot varandra efter valt antal rundor
  let pairsLeft = pairs - pairsPerRounds; //antal unika par kvar
  res.json({
    pairsLeft: pairsLeft,
  });
});

// GET /match?n=&i=&d=
// Returnerar vem spelare i möter i runda d
app.get("/match", (req, res) => {
  const n = parseInt(req.query.n);
  const i = parseInt(req.query.i);
  const d = parseInt(req.query.d);

  if (isNaN(n) || isNaN(i) || isNaN(d)) {
    return res
      .status(400)
      .json({ error: "Parametrar n, i och d måste vara nummer" });
  }

  if (i >= n || i < 0) {
    return res
      .status(400)
      .json({ error: "Spelare index i måste vara mellan 0 och n-1" });
  }

  if (d < 1 || d >= n) {
    return res
      .status(400)
      .json({ error: "Runda d måste vara mellan 1 och n-1" });
  }

  const players = allPlayers.slice(0, n);

  const fixed = players[0];
  let others = players.slice(1);

  const steps = d - 1;
  const rotated = others.slice(steps).concat(others.slice(0, steps));

  const matches = [];
  matches.push([fixed, rotated[0]]);

  for (let j = 1; j < n / 2; j++) {
    matches.push([rotated[j], rotated[rotated.length - j]]);
  }

  const selectedPlayer = players[i];
  let opponent = null;

  // Kontrollera vilken opponent vald spelare möter i vald runda
  for (let match of matches) {
    if (match[0].id === selectedPlayer.id) {
      opponent = match[1];
      break;
    } else if (match[1].id === selectedPlayer.id) {
      opponent = match[0];
      break;
    }
  }

   ///SNABB DEBUG för att se så id och index av val stämmer
console.log("DEBUG i =", i);
console.log("selectedPlayer =", selectedPlayer);
console.log("allPlayers =", allPlayers.map(p => p.name));

  res.json({
    round: d,
    player: {
      index: i,
      name: selectedPlayer.name,
      id: selectedPlayer.id,
    },
    opponent: {
      name: opponent.name,
      id: opponent.id,
    },
    match: `${selectedPlayer.name} vs ${opponent.name}`,
  });
});

//GET	/player/:i/schedule
app.get("/player/:i/schedule", (req, res) => {
  const i = parseInt(req.params.i);
  const players = allPlayers;
  const n = players.length;

  // Hitta spelaren baserat på index
  if (i < 0 || i >= n) {
    return res.status(404).json({ error: "Spelare index utanför gränser" });
  }

  const selectedPlayer = players[i];
  const playerIndex = i;
  const allRounds = [];

  // Generera alla rundor för denna spelare
  for (let round = 1; round < n; round++) {
    const fixed = players[0];
    let others = players.slice(1);
    const steps = round - 1;
    const rotated = others.slice(steps).concat(others.slice(0, steps));

    const matches = [];
    matches.push([fixed, rotated[0]]);

    for (let i = 1; i < n / 2; i++) {
      matches.push([rotated[i], rotated[rotated.length - i]]);
    }

    // Hitta denna spelares match i denna runda
    let opponent = null;
    for (let match of matches) {
      if (match[0].id === selectedPlayer.id) {
        opponent = match[1];
        break;
      } else if (match[1].id === selectedPlayer.id) {
        opponent = match[0];
        break;
      }
    }

    if (opponent) {
      allRounds.push({
        round: round,
        opponent: {
          id: opponent.id,
          name: opponent.name,
        },
        match: `${selectedPlayer.name} vs ${opponent.name}`,
      });
    }
  }

  res.json({
    player: {
      id: selectedPlayer.id,
      name: selectedPlayer.name,
    },
    totalRounds: n - 1,
    schedule: allRounds,
  });
});

//DELETE /player/:id
app.delete("/player/:id", (req, res) => {
  const { id } = req.params;
  const playerIndex = allPlayers.findIndex(
    (player) => player.id === parseInt(id)
  );

  if (playerIndex === -1) {
    return res.status(404).json({ error: "Spelare inte hittad" });
  }

  allPlayers.splice(playerIndex, 1);

  /////////////////////////////////////////////////////////////////////// Skriv till filen
  const filePath = path.join(__dirname, "data", "allPlayers.json");
  const fileContent = JSON.stringify(allPlayers, null, 2);

  fs.writeFileSync(filePath, fileContent);

  res.status(204).send();
});

//POST /player
app.post("/player", (req, res) => {
  const { name } = req.body;

  // Hitta högsta ID och lägg till 1
  const maxId =
    allPlayers.length > 0 ? Math.max(...allPlayers.map((p) => p.id)) : 0;

  const newPlayer = {
    id: maxId + 1,
    name: name,
  };
  allPlayers.push(newPlayer);

  const filePath = path.join(__dirname, "data", "allPlayers.json");
  const fileContent = JSON.stringify(allPlayers, null, 2);

  fs.writeFileSync(filePath, fileContent);

  res.status(201).json(newPlayer);
});

app.listen(port, () => {
  console.log(`Running, listening to port ${port}`);
});
