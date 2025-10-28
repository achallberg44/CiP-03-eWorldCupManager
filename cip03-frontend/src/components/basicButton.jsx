import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({
  onClick,
  children,
  variant = "contained",
  color = "primary",
  sx,
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        padding: "1rem",
        color: "#fff",
        margin: "25px auto",
        background: "#07291b",
        boxShadow: "0 4px 16px rgba(78, 156, 255, 0.3)",
        cursor: "pointer",
        transition: "background 0.3s, transform 0.2s",
        display: "block",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
