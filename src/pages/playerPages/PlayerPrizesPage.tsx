import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import PlayerRewardsTable from "../../components/PlayerRewardsTable";

function PlayerPrizesPage() {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  const userName = params.get("userName");
  const balance = params.get("balance");

  var bettingDataArray: Array<BettingData> = [];

  const [bettingDataList, setBettingDataList] = useState(bettingDataArray);
  const [totalWinnerBets, setTotalWinnerBets] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [winnerNumbers, setWinnerNumbers] = useState<Array<number>>([]);

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
          let winningBetCounter: number = 0;
          let rewardCounter: number = 0;

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

            if (element.Reward) {
              winningBetCounter += element.Reward > 0 ? 1 : 0;
              rewardCounter += element.Reward;
            }

            bettingDataArray.push(bettingType);
          });

          setTotalWinnerBets(winningBetCounter);
          setTotalReward(rewardCounter);
          setBettingDataList(bettingDataArray);
        });
    }
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
    fetchBettingHistory();
    fetchWinnerNumbers();
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
      <h1 className="player-view-div">Nyereményeim</h1>
      <br />

      <PlayerRewardsTable
        winnerNums={winnerNumbers}
        myBettingData={bettingDataList}
        myTotalBets={bettingDataList.length}
        myTotalWinnerBets={totalWinnerBets}
        myTotalReward={totalReward}
      />
    </>
  );
}

export default PlayerPrizesPage;
