import { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  userId: number;
  userName: string;
  balance: number;
}

function AdminView({ userId, userName, balance }: Props) {
  const [showSpinner, setShowSpinner] = useState(true);
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

  useEffect(() => {
    if (userId != 0) {
      setShowSpinner(false);
    }
  }, [userId]);

  return (
    <div className="center-content">
      {showSpinner ? (
        <div className="center-content">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="div_for_cards_admin">
          <Card
            heading="Fogadás (Szimuláció)"
            onClickCard={() => {
              console.log("Fogadás (Szimuláció) clicked");
              navigate(
                `/fogadas-szimulacio?userId=${userId}&userName=${userName}&balance=${balance}`
              );
            }}
          ></Card>
          <Card
            heading="Szelvények"
            onClickCard={() => {
              console.log("Szelvények clicked");
              navigate(
                `/fogadasok?userId=${userId}&userName=${userName}&balance=${balance}`
              );
            }}
          ></Card>
          <Card
            heading="Sorsolás"
            onClickCard={() => {
              console.log("Sorsolás clicked");
              navigate(
                `/sorsolas?userId=${userId}&userName=${userName}&balance=${balance}`
              );
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
      )}
    </div>
  );
}

export default AdminView;
