import { useState } from "react";
import SortingButton from "./SortingButton";

interface Props {
  bettingData: Array<BettingData>;
}

function AdminAllBetsTable({ bettingData }: Props) {
  const [isAscendingPlayer, setIsAscendingPlayer] = useState(false);
  const [isAscendingHit, setIsAscendingHit] = useState(false);
  const [isAscendingReward, setIsAscendingReward] = useState(false);

  function organizePlayer() {
    if (isAscendingPlayer) {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => a.User_ID! - b.User_ID!
      );
    } else {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => b.User_ID! - a.User_ID!
      );
    }
    setIsAscendingPlayer(!isAscendingPlayer);
  }

  function organizeHits() {
    if (isAscendingHit) {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => a.Hit! - b.Hit!
      );
    } else {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => b.Hit! - a.Hit!
      );
    }
    setIsAscendingHit(!isAscendingHit);
  }

  function organizeReward() {
    if (isAscendingReward) {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => a.Reward! - b.Reward!
      );
    } else {
      bettingData = bettingData.sort(
        (a: BettingData, b: BettingData) => b.Reward! - a.Reward!
      );
    }
    setIsAscendingReward(!isAscendingReward);
  }

  return (
    <div className="container text-center mb-4">
      <br />
      <div className="row align-items-start mb-3">
        <div className="col mt-1 mb-1">Számok</div>
        <div className="col">
          <SortingButton buttonName="Játék" onButtonClick={organizePlayer} />
        </div>
        <div className="col">
          <SortingButton buttonName="Találat" onButtonClick={organizeHits} />
        </div>
        <div className="col">
          <SortingButton
            buttonName="Nyeremény"
            onButtonClick={organizeReward}
          />
        </div>
      </div>

      {bettingData.map((item) => (
        <div className="row align-items-start" key={item.ID}>
          <div className="col">
            {item.Num_1} - {item.Num_2} - {item.Num_3} - {item.Num_4} -{" "}
            {item.Num_5}
          </div>
          <div className="col">
            {item.User_ID === 1 ? "Generált" : "Játékos"}
          </div>
          <div className="col">{item.Hit ?? 0} db</div>
          <div className="col">{item.Reward ?? 0} (akcse)</div>
        </div>
      ))}
    </div>
  );
}

export default AdminAllBetsTable;
