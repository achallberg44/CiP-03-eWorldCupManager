import "../App.css";
import DropdownPlayers from "../components/dropdownPlayers";

export default function ValjSpelare() {
  return (
    <div className="carddiv">
      <div className="infoText">
        <h1>Se en specifik spelares matcher</h1>
        <p>
          Välj en spelare från dropdown-menyn och klicka på knappen för att se
          just den spelarens matcher i turneringen
        </p>
      </div>
      <DropdownPlayers />
    </div>
  );
}
