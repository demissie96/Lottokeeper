import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { canYouBet } from "../../functions/Functions";
import LoadingSpinner from "../../components/LoadingSpinner";

let selectedNumbersList: Number[] = [];

function PlayerBettingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const userName = params.get("userName");
  let balance = params.get("balance");

  const [selectedNumbers, setSelectedNumbers] = useState(selectedNumbersList);
  const [userBalance, setUserBalance] = useState(balance);
  const [canPlay, setCanPlay] = useState(false);
  const [loading, setLoading] = useState(true);

  const generateCheckboxes = () => {
    const checkboxes = [];

    for (let i = 1; i <= 39; i++) {
      checkboxes.push(
        <div key={i} className="form-check-inline">
          <input
            className="btn-check"
            type="checkbox"
            id={`checkbox-${i}`}
            onChange={(item: any) => {
              checkBetting(item, i);
            }}
          />
          <label
            className="btn btn-outline-success number-checkbox mt-4"
            htmlFor={`checkbox-${i}`}
          >
            {i}
          </label>
        </div>
      );
    }

    return checkboxes;
  };

  const checkBetting = (item: any, num: Number) => {
    console.log("clicked" + num);
    console.log("Is checked? : " + item.target.checked);

    if (item.target.checked === true) {
      selectedNumbersList.push(num);
    } else if (item.target.checked === false) {
      const removeIndex = selectedNumbersList.indexOf(num);
      selectedNumbersList.splice(removeIndex, 1);
    }

    if (selectedNumbersList.length === 5) {
      selectedNumbersList = selectedNumbersList.sort(
        (n1: any, n2: any) => n1 - n2
      );
      setSelectedNumbers(selectedNumbersList);
      console.log(selectedNumbers.length);
      console.log(selectedNumbersList);
    } else {
      setSelectedNumbers([]);
      console.log(selectedNumbers.length);
      console.log(selectedNumbersList);
    }
  };

  const takeABet = async () => {
    if (userId === null) {
      alert("❌ Játékos nincs bejelentkezve!");
      return;
    }
    if (balance === null || Number(balance) < 500) {
      alert("❌ Nincs elég akcséd!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("user_id", userId);
    myHeaders.append("num1", selectedNumbers[0].toString());
    myHeaders.append("num2", selectedNumbers[1].toString());
    myHeaders.append("num3", selectedNumbers[2].toString());
    myHeaders.append("num4", selectedNumbers[3].toString());
    myHeaders.append("num5", selectedNumbers[4].toString());

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
        balance = (Number(balance) - 500).toString();
        setUserBalance(balance);
        alert("✅ Sikeres fogadás!");
        navigate(
          `/fogadasaim?userId=${userId}&userName=${userName}&balance=${balance}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("❌ A fogadás sikertelen volt!");
      });
    window.location.reload();
  };

  useEffect(() => {
    selectedNumbersList = [];
    canYouBet().then((result) => {
      if (result) {
        setCanPlay(true);
      } else {
        setCanPlay(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header
        userName={userName ?? ""}
        balance={Number(userBalance)}
        onButtonClick={() => {
          localStorage.removeItem("user_id");
          navigate("/");
        }}
      ></Header>
      {loading ? (
        <div className="player-view-div">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {canPlay ? (
            <div className="player-view-div">
              <h1>Tippelj 5 számot</h1>
              <br />
              <div className="form-group width400">
                {generateCheckboxes().map((checkbox, index) => (
                  <React.Fragment key={index}>
                    {checkbox}
                    {(index + 1) % 6 === 0 && <br />}{" "}
                    {/* Start a new line after every 6 checkboxes */}
                  </React.Fragment>
                ))}
              </div>
              <br />
              <div className="text-center mt-5">
                <button
                  type="button"
                  className={
                    selectedNumbers.length === 0
                      ? "btn btn-primary disabled"
                      : "btn btn-primary"
                  }
                  onClick={takeABet}
                >
                  Fogadás
                </button>
              </div>
            </div>
          ) : (
            <div className="player-view-div width400">
              <h3 className="mb-4">Már megvolt a sorsolás.</h3>

              <p>Az üzemeltetőnek új kört kell indítania, hogy fogadhass.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PlayerBettingPage;
