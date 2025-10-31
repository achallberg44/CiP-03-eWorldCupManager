import "../App.css";
import GetOpponent from "../components/getOpponent";

export default function MaxRundor() {
  return (
    <div className="carddiv">
      <div className="infoText">
        <h2>Motståndarsökning</h2>
        <p>
          Här kan du ta reda på vem en specifik spelare möter i en viss runda. 
          Välj en spelare från listan och ange vilket rundnummer du vill kontrollera, 
          så får du svaret på vilken motståndare spelaren kommer att möta.
        </p>
      </div>
      <GetOpponent />
    </div>
  );
}
