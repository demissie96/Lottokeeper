import Header from "../../components/Header";
import { useParams } from "react-router-dom";

function PlayerBettingPage() {
  const { userId, userName, balance } = useParams();

  return (
    <>
      <Header
        userName={userName ?? ""}
        balance={Number(balance)}
        onButtonClick={() => {
          console.log("mivan mennyé má");
        }}
      ></Header>
      <div>
        <h1>Tippelj 5 számot</h1>
      </div>
    </>
  );
}

export default PlayerBettingPage;
