import { useState } from "react";
import SortingButton from "./SortingButton";

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
  const [isAscending, setIsAscending] = useState(false);

  function organizeHits() {
    if (isAscending) {
      myBettingData = myBettingData.sort(
        (a: BettingData, b: BettingData) => a.Hit! - b.Hit!
      );
    } else {
      myBettingData = myBettingData.sort(
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
        <div className="col">Összes szelvény: {myTotalBets} db</div>
        <div className="col">Nyertes szelvények: {myTotalWinnerBets} db</div>
        <div className="col">Teljes nyeremény: {myTotalReward} akcse</div>
      </div>
      <br />
      <div className="row align-items-start">
        <div className="col">Számok</div>
        <div className="col">
          <SortingButton buttonName="Találat" onButtonClick={organizeHits} />
        </div>
        <div className="col">Nyeremény</div>
      </div>

      {myBettingData.map((item) => (
        <div className="row align-items-start" key={item.ID}>
          <div className="col">
            {item.Num_1} - {item.Num_2} - {item.Num_3} - {item.Num_4} -{" "}
            {item.Num_5}
          </div>
          <div className="col">{item.Hit ?? 0} db</div>
          <div className="col">{item.Reward ?? 0} (akcse)</div>
        </div>
      ))}
    </div>
  );
}

export default PlayerRewardsTable;
