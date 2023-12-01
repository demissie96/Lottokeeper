import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

function AdminDrawingPage() {
  const [winnerNumbers, setWinnerNumbers] = useState<Array<number>>([]);
  let winnerNumbersList: Array<number> = [];

  const navigate = useNavigate();

  function randomNumber() {
    return Math.floor(Math.random() * (40 - 1) + 1);
  }

  function generateFiveNumber() {
    let numList: Array<number> = [];

    for (let index = 0; index < 5; index++) {
      numList.push(randomNumber());
    }

    winnerNumbersList = numList;
    setWinnerNumbers(numList);
  }

  const saveWinnerNumbersToDB = async () => {
    generateFiveNumber();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("num1", winnerNumbersList[0].toString());
    myHeaders.append("num2", winnerNumbersList[1].toString());
    myHeaders.append("num3", winnerNumbersList[2].toString());
    myHeaders.append("num4", winnerNumbersList[3].toString());
    myHeaders.append("num5", winnerNumbersList[4].toString());

    const options: RequestInit = {
      method: "POST",
      headers: myHeaders,
    };

    await fetch(
      "https://lottokeeperbackend.johannesdemissi.repl.co/new_winner_nums",
      options
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("✅ Sikeres sorsolás!");
      })
      .catch((error) => {
        console.error("Error:", error);
        setWinnerNumbers([]);
        alert("❌ Sikertelen sorsolás!");
      });
  };

  const fetchWinnerNumbers = () => {
    fetch("https://lottokeeperbackend.johannesdemissi.repl.co/winner_numbers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          let winArray: Array<number> = [
            data[0].Num_1,
            data[0].Num_2,
            data[0].Num_3,
            data[0].Num_4,
            data[0].Num_5,
          ];

          setWinnerNumbers(winArray);
        }
      });
  };

  useEffect(() => {
    fetchWinnerNumbers();
  }, []);

  return (
    <>
      <Header
        userName={""}
        balance={0}
        onButtonClick={() => {
          localStorage.removeItem("user_id");
          navigate("/");
        }}
      />
      <br />
      {winnerNumbers.length === 0 ? (
        <div>
          <h1>Sorsolás</h1>
          <br />
          <div className="center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={saveWinnerNumbersToDB}
            >
              Sorsolás Indítása
            </button>
          </div>
        </div>
      ) : null}
      {winnerNumbers.length > 0 ? (
        <div>
          <h1>Nyertes számok:</h1>
          <br />
          <div className="center">
            {winnerNumbers.map((number, index) => (
              <span key={index} className="number-span m-4 h3">
                {number}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AdminDrawingPage;
