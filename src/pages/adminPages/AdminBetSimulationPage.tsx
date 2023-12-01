import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";

function AdminBetSimulationPage() {
  const navigate = useNavigate();

  const [generateNumber, setGenerateNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingNumber, setLoadingNumber] = useState(1);
  let loadingNum = 1;

  function randomNumber() {
    return Math.floor(Math.random() * (40 - 1) + 1);
  }

  const generateBetsWrapper = async () => {
    await generateBets().then((response) => {
      setLoading(false);

      if (response) {
        alert("✅ Sikeres fogadás!");
      } else {
        alert("❌ A fogadás sikertelen volt!");
      }

      window.location.reload();
    });
  };

  const generateBets = async (): Promise<boolean> => {
    var isSuccess = true;
    setLoading(true);
    for (let index = 0; index < generateNumber; index++) {
      const random1 = randomNumber();
      const random2 = randomNumber();
      const random3 = randomNumber();
      const random4 = randomNumber();
      const random5 = randomNumber();

      console.log(`${random1} ${random2} ${random3} ${random4} ${random5}`);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("user_id", "1");
      myHeaders.append("num1", random1.toString());
      myHeaders.append("num2", random2.toString());
      myHeaders.append("num3", random3.toString());
      myHeaders.append("num4", random4.toString());
      myHeaders.append("num5", random5.toString());

      const options: RequestInit = {
        method: "POST",
        headers: myHeaders,
      };

      await fetch(
        "https://lottokeeperbackend.johannesdemissi.repl.co/newbet",
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
          loadingNum++;
          setLoadingNumber(loadingNum);
        })
        .catch((error) => {
          console.error("Error:", error);
          isSuccess = false;
        });
    }

    return isSuccess;
  };

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
          <div>
            <p>
              Kész: {generateNumber}/{loadingNumber}
            </p>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Töltés...</span>
            </div>
          </div>
        ) : (
          <button
            className={
              generateNumber === 0
                ? "btn btn-primary disabled"
                : "btn btn-primary"
            }
            onClick={generateBetsWrapper}
          >
            Generálás
          </button>
        )}
      </div>
    </>
  );
}

export default AdminBetSimulationPage;
