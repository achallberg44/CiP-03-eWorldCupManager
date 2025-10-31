import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Start", path: "/" },
  { name: "Räkna rundor", path: "/maxrounds" },
  { name: "Specifik Runda", path: "/specifikrunda" },
  { name: "Spelarlista", path: "/spelarlista" },
  { name: "Välj Spelare", path: "/valjspelare" },
  { name: "Vem möter vem", path: "/vemmoter" },
  { name: "Hämta Motståndare", path: "/hamtamotstandare" },
];

export default function DrawerAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0 24px",
          }}
        >
          <Typography
            component={Link}
            to={"/"}
            variant="h6"
            sx={{
              flex: 2,
              textAlign: "left",
              fontSize: "20px",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            eWorldCupManager
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                className="nav-button"
                sx={{
                  color: "#fff",
                  padding: "0 30px",
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
