import { useEffect } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const navigate = useNavigate();

  const newCycle = (isAlert: boolean) => {
    const options: RequestInit = {
      method: "DELETE",
    };

    fetch(
      "https://lottokeeperbackend.johannesdemissi.repl.co/bettings",
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (isAlert) {
          alert("✅ Sikeres új kör indítása!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (isAlert) {
          alert("❌ Sikertelen új kör indítása!");
          window.location.reload();
        }
      });
  };

  const newGame = () => {
    const options: RequestInit = {
      method: "DELETE",
    };

    fetch("https://lottokeeperbackend.johannesdemissi.repl.co/users", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("✅ Sikeres új játék indítása!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("❌ Sikertelen új játék indítása!");
        window.location.reload();
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="center-content">
      <div className="div_for_cards_admin">
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
            newCycle(true);
          }}
        ></Card>
        <Card
          heading="Új játék"
          onClickCard={() => {
            console.log("Új játék clicked");
            newCycle(false);
            newGame();
          }}
        ></Card>
      </div>
    </div>
  );
}

export default AdminView;
