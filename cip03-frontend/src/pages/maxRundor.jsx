import "../App.css";
import MaxRounds from "../components/maxRounds.jsx";

export default function MaxRundor() {
  return (
    <div className="carddiv">
      <div className="infoText">
        <h1>Räkna ut max antal rundor för n antal spelare</h1>
        <p>
          Mata in ett valfritt, jämnt antal spelare och klicka sedan på knappen
          för att se hur många rundor som det antalet spelare kommer spela.
        </p>
      </div>
      <MaxRounds />
    </div>
  );
}
