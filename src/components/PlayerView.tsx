import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerView.css";
import "../types/Types";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  userId: number;
  userName: string;
  balance: number;
  onButtonClick: (item: UserDetail) => void;
}

function PlayerView({ userId, userName, balance, onButtonClick }: Props) {
  let userDetailList: UserDetail[] = [];
  const [userList, setUserList] = useState(userDetailList);
  const [newUserName, setNewUserName] = useState("");
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const navigate = useNavigate();

  const fetchData = () => {
    fetch("https://lottokeeperbackend.johannesdemissi.repl.co/all_users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserList(data.slice(1));
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    if (userId > 0) {
      setIsUserSelected(true);
      console.log(userId);
      setShowSpinner(false);
    } else {
      if (localStorage.getItem("user_id") === null) {
        fetchData();
      }

      console.log(userId);
    }
  }, [userId]);

  const handleInputChange = (event: any) => {
    setNewUserName(event.target.value);
  };
  const createPlayer = () => {
    if (newUserName != "") {
      console.log("Create: " + newUserName);

      const input = document.getElementById("nameInput") as HTMLInputElement;
      if (input != null) {
        input.value = "";
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("name", newUserName);
      myHeaders.append("balance", "10000");

      const options: RequestInit = {
        method: "POST",
        headers: myHeaders,
      };

      fetch(
        "https://lottokeeperbackend.johannesdemissi.repl.co/newuser",
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
          // Handle the response data here
          fetchData();
          setNewUserName("");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors here
        });
    }
  };

  return (
    <>
      {showSpinner ? (
        <div className="center-content">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {isUserSelected === false && (
            <div className="player-view-div">
              <h1>Új játékos</h1>
              <br></br>
              <form className="width400 ">
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Teljes Név
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="nameInput"
                    onChange={handleInputChange}
                  ></input>
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createPlayer}
                  >
                    Létrehozás
                  </button>
                </div>
              </form>
              <br></br>
              {userList.length > 0 && (
                <div className="player-view-div">
                  <h1>Válassz játékost</h1>
                  <ul className="list-group width400">
                    {userList.map((item) => (
                      <li
                        className="list-group-item"
                        key={item.ID}
                        onClick={() => {
                          console.log(item.Name + " + " + item.ID);
                          onButtonClick(item);
                        }}
                      >
                        {item.Name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {isUserSelected && (
            <div className="div_for_cards">
              <Card
                heading="Fogadás"
                onClickCard={() => {
                  navigate(
                    `/fogadasaim?userId=${userId}&userName=${userName}&balance=${balance}`
                  );
                }}
              ></Card>
              <Card
                heading="Szelvényeim"
                onClickCard={() => {
                  navigate(
                    `/szelvenyeim?userId=${userId}&userName=${userName}&balance=${balance}`
                  );
                }}
              ></Card>
              <Card
                heading="Nyereményeim"
                onClickCard={() => {
                  navigate(
                    `/nyeremenyeim?userId=${userId}&userName=${userName}&balance=${balance}`
                  );
                }}
              ></Card>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PlayerView;
