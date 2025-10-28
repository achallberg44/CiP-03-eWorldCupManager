import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields() {
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        sx={{ margin: "1rem auto" }}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
    </Box>
  );
}
