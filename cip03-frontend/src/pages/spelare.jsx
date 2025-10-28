import React, { useState, useEffect } from "react";
import "../App.css";
import AddPlayer from "../components/addPlayer";
import DeletePlayer from "../components/deletePlayer.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Players() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/getplayers`);
      const json = await response.json();
      setResult(json);
    })();
  }, []);

  return (
    <div className="playerPage">
      <h1>Spelare</h1>
      <p>Här kan du se spelarna</p>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 600,
          marginBottom: 4,
          margin: "2rem auto 4rem auto",
        }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: "black",
            }}
          >
            <TableRow>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Spelarnamn
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
              >
                ID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((player) => (
              <TableRow key={player.id}>
                <TableCell sx={{ fontWeight: "bold" }}>{player.name}</TableCell>
                <TableCell>{player.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="addDelete">
        <div>
          <AddPlayer />
        </div>
        <div>
          <DeletePlayer />
        </div>
      </div>
    </div>
  );
}
