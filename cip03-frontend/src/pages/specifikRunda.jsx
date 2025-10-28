import "../App.css";
import SpecificRound from "../components/specificRound.jsx";

export default function SpecifikRunda() {
  return (
    <div className="carddiv">
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <h1>Räkna ut vem som möter vem på en specifik runda</h1>
        <p>
          Det är 20 stycken spelare. Mata in ett jämnt nummer i fältet D och
          klicka på knappen för att se vilka spelare som möts i den specifika
          rundan.
        </p>
      </div>
      <SpecificRound />
    </div>
  );
}
