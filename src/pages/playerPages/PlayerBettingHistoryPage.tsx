import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

function PlayerBettingHistoryPage() {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const userName = params.get("userName");
  const balance = params.get("balance");

  var bettingDataArray: Array<BettingData> = [];

  const [bettingDataList, setBettingDataList] = useState(bettingDataArray);

  const fetchBettingHistory = () => {
    if (userId !== null) {
      fetch(
        "https://lottokeeperbackend.johannesdemissi.repl.co/player_betting_list",
        {
          headers: {
            user_id: userId,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          bettingDataArray = [];

          data.forEach((element: BettingData) => {
            let bettingType: BettingData = {
              ID: element.ID,
              User_ID: element.User_ID,
              Num_1: element.Num_1,
              Num_2: element.Num_2,
              Num_3: element.Num_3,
              Num_4: element.Num_4,
              Num_5: element.Num_5,
              Hit: element.Hit,
              Reward: element.Reward,
              Betting_Date: element.Betting_Date,
            };

            bettingDataArray.push(bettingType);
          });

          setBettingDataList(bettingDataArray);
        });
    }
  };

  useEffect(() => {
    fetchBettingHistory();
  }, []);

  return (
    <>
      <Header
        userName={userName ?? ""}
        balance={Number(balance)}
        onButtonClick={() => {
          localStorage.removeItem("user_id");
          navigate("/");
        }}
      ></Header>
      <br />
      <h1 className="player-view-div">Szelvényeim</h1>
      <br />
      <ul className="list-group width300 mb-4">
        {bettingDataList.map((item, index) => (
          <li className="list-group-item" key={item.ID}>
            ({index + 1}) Szelvény: {item.Num_1} - {item.Num_2} - {item.Num_3} -{" "}
            {item.Num_4} - {item.Num_5}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlayerBettingHistoryPage;
