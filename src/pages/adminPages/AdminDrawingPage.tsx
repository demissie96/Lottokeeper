import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { generateFiveNumber } from "../../functions/Functions";
import AdminStatisticsTable from "../../components/AdminStatisticsTable";

function AdminDrawingPage() {
  const [allBetsData, setAllBetsData] = useState<Array<BettingData>>([]);
  const [isDataChecked, setIsDataChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [winnerNumbers, setWinnerNumbers] = useState<Array<number>>([]);
  let winnerNumbersList: Array<number> = [];

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const userName = params.get("userName");
  const balance = params.get("balance");
  var newBalance: number = 0;

  // Get winner numbers, get all bettings
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
          fetchAllBettings();
        }

        setLoading(false);
        setIsDataChecked(true);
      });
  };

  const fetchAllBettings = async (): Promise<Array<BettingData>> => {
    try {
      const response = await fetch(
        "https://lottokeeperbackend.johannesdemissi.repl.co/all_bets_list"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      let allBettingsArray: Array<BettingData> = [];

      if (data.length > 0) {
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

          allBettingsArray.push(bettingType);
        });

        setAllBetsData(allBettingsArray);
        return allBettingsArray;
      } else {
        // Handle the case when there is no data
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, you might want to throw it or return a default value
      throw error;
    }
  };

  // Save winner numbers

  const saveWinnerNumbersToDB = async () => {
    setLoading(true);

    winnerNumbersList = generateFiveNumber();
    setWinnerNumbers(winnerNumbersList);

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
        updateHitAndRewardInBettings();
      })
      .catch((error) => {
        console.error("Error:", error);
        setWinnerNumbers([]);
      });
  };

  // Rewards and hits calculations --> update Bettings db

  const calculateRewards = async (): Promise<string> => {
    const allBettings = await fetchAllBettings();
    let idHitList: Array<IDHitData> = [];

    allBettings.forEach((element) => {
      let hitCount: number = 0;
      if (winnerNumbersList.includes(element.Num_1)) {
        hitCount++;
      }
      if (winnerNumbersList.includes(element.Num_2)) {
        hitCount++;
      }
      if (winnerNumbersList.includes(element.Num_3)) {
        hitCount++;
      }
      if (winnerNumbersList.includes(element.Num_4)) {
        hitCount++;
      }
      if (winnerNumbersList.includes(element.Num_5)) {
        hitCount++;
      }

      const idHitData: IDHitData = {
        ID: element.ID,
        Hit: hitCount,
        User_ID: element.User_ID,
      };

      idHitList.push(idHitData);
    });

    let totalHitCount: number = 0;

    idHitList.forEach((element) => {
      totalHitCount = totalHitCount + element.Hit;
    });

    const hitUnitPrize: number = Math.floor(
      Number(balance) / 2 / totalHitCount
    );
    let idHitRewardList: Array<IDHitRewardData> = [];

    let totalWinPrizes: number = 0;

    idHitList.forEach((element) => {
      const idHitReward: IDHitRewardData = {
        ID: element.ID,
        Hit: element.Hit,
        User_ID: element.User_ID,
        Reward: element.Hit > 1 ? element.Hit * hitUnitPrize : 0,
      };
      idHitRewardList.push(idHitReward);

      if (idHitReward.Reward > 0) {
        totalWinPrizes += idHitReward.Reward;
      }
    });

    newBalance = Number(balance) - totalWinPrizes;

    let updateQuery: string = "";

    idHitRewardList.forEach((element) => {
      updateQuery += `UPDATE Bettings SET Hit = ${element.Hit}, Reward = ${element.Reward} WHERE ID = ${element.ID}; `;
      if (element.User_ID !== 1) {
        updateQuery += `UPDATE Users SET Balance = Balance + ${element.Reward} WHERE ID = ${element.User_ID}; `;
      }
    });

    updateQuery += `UPDATE Users SET Balance = Balance - ${totalWinPrizes} WHERE ID = 1; `;

    return updateQuery;
  };

  const updateHitAndRewardInBettings = async () => {
    await calculateRewards().then((queryString) => {
      if (queryString === "") {
        alert("✅ Sikeres sorsolás! Nem volt nyertes.");
        return;
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
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          alert("✅ Sikeres sorsolás!");
          navigate(
            `/sorsolas?userId=1&userName=${userName}&balance=${newBalance}`
          );
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
          alert("❌ A sorsolás sikertelen volt!");
        });
    });
  };

  useEffect(() => {
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
      />
      <br />
      {isDataChecked ? (
        <>
          {winnerNumbers.length === 0 ? (
            <div className="player-view-div">
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
        </>
      ) : null}

      {loading ? (
        <div className="player-view-div">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {winnerNumbers.length > 0 ? (
            <div className="player-view-div">
              <h1>Nyertes számok:</h1>
              <br />
              <div className="center">
                {winnerNumbers.map((number, index) => (
                  <span key={index} className="number-span m-4 h3">
                    {number}
                  </span>
                ))}
              </div>
              <br />
              <AdminStatisticsTable bettingData={allBetsData} />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default AdminDrawingPage;
