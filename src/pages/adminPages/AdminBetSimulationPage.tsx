import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

function AdminBetSimulationPage() {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userName = params.get("userName");
  const balance = params.get("balance");

  const [generateNumber, setGenerateNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  function randomNumber() {
    return Math.floor(Math.random() * (40 - 1) + 1);
  }

  const generateBets = () => {
    setLoading(true);

    let queryString: string = "";

    for (let index = 0; index < generateNumber; index++) {
      const random1 = randomNumber();
      const random2 = randomNumber();
      const random3 = randomNumber();
      const random4 = randomNumber();
      const random5 = randomNumber();

      console.log(`${random1} ${random2} ${random3} ${random4} ${random5}`);

      queryString += `INSERT INTO Bettings (User_ID, Num_1, Num_2, Num_3, Num_4, Num_5) VALUES(1, ${random1}, ${random2}, ${random3}, ${random4}, ${random5}); `;
      queryString += `UPDATE Users SET Balance = Balance + 500 WHERE ID = 1; `;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("query", queryString);

    const options: RequestInit = {
      method: "PUT",
      headers: myHeaders,
    };

    fetch(
      "https://lottokeeperbackend.johannesdemissi.repl.co/multiple_query",
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setLoading(false);
        alert("✅ Sikeres sorsolás!");
        let newBalance: number = Number(balance) + 500 * generateNumber;
        navigate(
          `/fogadas-szimulacio?userId=1&userName=${userName}&balance=${newBalance}`
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        alert("❌ A sorsolás sikertelen volt!");
        window.location.reload();
      });
  };

  return (
    <>
      <Header
        userName={userName ?? ""}
        balance={Number(balance)}
        onButtonClick={() => {
          localStorage.removeItem("user_id");
          navigate("/");
        }}
      />
      <br />
      <h1 className="mt-5 player-view-div">Fogadás szimuláció</h1>
      <br />
      <div className="width400">
        <p>Add meg hány szelvényt szeretnél generálni.</p>
        <input
          type="number"
          className="form-control"
          min="1"
          defaultValue={1}
          onChange={(item) => {
            if (item.target.value === "") {
              setGenerateNumber(0);
            } else {
              setGenerateNumber(Number(item.target.value));
            }
          }}
        ></input>
        <br />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className={
              generateNumber === 0
                ? "btn btn-primary disabled"
                : "btn btn-primary"
            }
            onClick={generateBets}
          >
            Generálás
          </button>
        )}
      </div>
    </>
  );
}

export default AdminBetSimulationPage;
