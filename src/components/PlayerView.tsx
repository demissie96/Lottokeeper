import React, { useEffect, useState } from "react";
import "./PlayerView.css";

type UserDetail = {
  ID: number;
  Name: string;
  Balance: number;
};

function PlayerView() {
  let userDetailList: UserDetail[] = [];
  const [userList, setUserList] = useState(userDetailList);

  const fetchData = () => {
    fetch("https://lottokeeperbackend.johannesdemissi.repl.co/all_users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.remo;
        setUserList(data.slice(1));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPlayer = () => {};

  return (
    <>
      {userList.length === 0 && (
        <div className="player-view-div">
          <h1>Új játékos létrehozása</h1>
          <br></br>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Teljes Név
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
              ></input>
              <br />
              <button type="button" className="btn btn-primary">
                Mentés
              </button>
            </div>
          </form>
        </div>
      )}
      {userList.length > 0 && (
        <div className="player-view-div">
          <h1>Játékosok</h1>
          <ul className="list-group">
            {userList.map((item, index) => (
              <li
                className="list-group-item"
                key={item.ID}
                onClick={() => {
                  console.log(item.Name);
                }}
              >
                {item.Name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default PlayerView;
