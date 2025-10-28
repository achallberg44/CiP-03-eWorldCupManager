import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BasicMenu from "./menu.jsx";

export default function Layout({ children }) {
  return (
    <>
      <BasicMenu />
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {children}
        </Box>
      </Container>
    </>
  );
}
