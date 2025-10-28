import "../App.css";
import WhoMeets from "../components/whoMeets.jsx";

export default function VemMoter() {
  return (
    <div className="carddiv">
      <div className="infoText">
        <h1>Räkna ut vem som möter vem</h1>
        <p>
          Följ instruktionerna nedan för att räkna ut vilken spelare den valda
          spelaren möter i en specifik runda.
        </p>
      </div>
      <WhoMeets />
    </div>
  );
}
