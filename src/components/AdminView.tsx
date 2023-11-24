import Card from "./Card";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const navigate = useNavigate();
  return (
    <div className="div_for_cards">
      <Card
        heading="Fogadás (Szimuláció)"
        onClickCard={() => {
          console.log("Fogadás (Szimuláció) clicked");
          navigate("/fogadas-szimulacio");
        }}
      ></Card>
      <Card
        heading="Szelvények"
        onClickCard={() => {
          console.log("Szelvények clicked");
          navigate("/fogadasok");
        }}
      ></Card>
      <Card
        heading="Sorsolás"
        onClickCard={() => {
          console.log("Sorsolás clicked");
          navigate("/sorsolas");
        }}
      ></Card>
      <Card
        heading="Új kör"
        onClickCard={() => {
          console.log("Új kör clicked");
        }}
      ></Card>
      <Card
        heading="Új játék"
        onClickCard={() => {
          console.log("Új játék clicked");
        }}
      ></Card>
    </div>
  );
}

export default AdminView;
