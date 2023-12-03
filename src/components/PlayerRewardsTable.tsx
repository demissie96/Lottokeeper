import { useState } from "react";

interface Props {
  winnerNums: Array<number>;
  myBettingData: Array<BettingData>;
  myTotalBets: number;
  myTotalWinnerBets: number;
  myTotalReward: number;
}

function PlayerRewardsTable({
  winnerNums,
  myBettingData,
  myTotalBets,
  myTotalWinnerBets,
  myTotalReward,
}: Props) {
  const [isAscending, setIsAscending] = useState(true);

  function organizeHits() {
    let sortedData: Array<BettingData>;
    if (isAscending) {
      sortedData = myBettingData.sort(
        (a: BettingData, b: BettingData) => a.Hit! - b.Hit!
      );
    } else {
      sortedData = myBettingData.sort(
        (a: BettingData, b: BettingData) => b.Hit! - a.Hit!
      );
    }
    setIsAscending(!isAscending);
  }

  return (
    <div className="container text-center mb-4">
      <div className="row align-items-start">
        <div className="col">
          <h3>
            🏆
            {winnerNums.length > 0
              ? ` Nyertes számok: (${winnerNums[0]} - ${winnerNums[1]} - ${winnerNums[2]} - ${winnerNums[3]} - ${winnerNums[4]}) `
              : " Még nem volt sorsolás "}
            🏆
          </h3>
        </div>
      </div>
      <br />
      <div className="row align-items-start">
        <div className="col">Összes szelvény: {myTotalBets}db</div>
        <div className="col">Nyertes szelvények: {myTotalWinnerBets}db</div>
        <div className="col">Teljes nyeremény: {myTotalReward}akcse</div>
      </div>
      <br />
      <div className="row align-items-start">
        <div className="col">Számok</div>
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={organizeHits}
          >
            <span>Találat </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </button>
        </div>
        <div className="col">Nyeremény</div>
      </div>

      {myBettingData.map((item) => (
        <div className="row align-items-start" key={item.ID}>
          <div className="col">
            {item.Num_1} - {item.Num_2} - {item.Num_3} - {item.Num_4} -{" "}
            {item.Num_5}
          </div>
          <div className="col">{item.Hit ?? 0}</div>
          <div className="col">{item.Reward ?? 0}</div>
        </div>
      ))}
    </div>
  );
}

export default PlayerRewardsTable;
