interface Props {
  bettingData: Array<BettingData>;
}

function AdminStatisticsTable({ bettingData }: Props) {
  const countOfHits5: number = bettingData.filter(
    (data) => data.Hit === 5
  ).length;
  const countOfHits4: number = bettingData.filter(
    (data) => data.Hit === 4
  ).length;
  const countOfHits3: number = bettingData.filter(
    (data) => data.Hit === 3
  ).length;
  const countOfHits2: number = bettingData.filter(
    (data) => data.Hit === 2
  ).length;
  const countOfHits0: number = bettingData.filter(
    (data) => data.Hit === 0 || data.Hit === 1
  ).length;

  const prizePerHits5: number =
    bettingData.find((data) => data.Hit === 5)?.Reward ?? 0;
  const prizePerHits4: number =
    bettingData.find((data) => data.Hit === 4)?.Reward ?? 0;
  const prizePerHits3: number =
    bettingData.find((data) => data.Hit === 3)?.Reward ?? 0;
  const prizePerHits2: number =
    bettingData.find((data) => data.Hit === 2)?.Reward ?? 0;
  const prizePerHits0: number =
    bettingData.find((data) => data.Hit === 0)?.Reward ?? 0;

  const totalPrizeForHit5: number = countOfHits5 * prizePerHits5;
  const totalPrizeForHit4: number = countOfHits4 * prizePerHits4;
  const totalPrizeForHit3: number = countOfHits3 * prizePerHits3;
  const totalPrizeForHit2: number = countOfHits2 * prizePerHits2;
  const totalPrizeForHit0: number = countOfHits0 * prizePerHits0;

  const totalBets: number = bettingData.length;
  const totalRevenue: number = totalBets * 500;

  let totalWinPrizes = 0;
  bettingData.forEach((element) => {
    totalWinPrizes += element.Reward ?? 0;
  });

  const totalProfit = totalRevenue - totalWinPrizes;

  return (
    <div className="mt-5">
      <h1>Eredmények</h1>
      <div className="container text-center mt-4">
        <div className="row align-items-start">
          <h5 className="col">Találat</h5>
          <h5 className="col">(5)</h5>
          <h5 className="col">(4)</h5>
          <h5 className="col">(3)</h5>
          <h5 className="col">(2)</h5>
          <h5 className="col">(0)</h5>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <hr />
          </div>
        </div>
        <div className="row align-items-center">
          <strong className="col ">Szelvények</strong>
          <div className="col">{countOfHits5} db</div>
          <div className="col">{countOfHits4} db</div>
          <div className="col">{countOfHits3} db</div>
          <div className="col">{countOfHits2} db</div>
          <div className="col">{countOfHits0} db</div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <hr />
          </div>
        </div>
        <div className="row align-items-center">
          <strong className="col">Nyeremény (db)</strong>
          <div className="col">{prizePerHits5} akcse/db</div>
          <div className="col">{prizePerHits4} akcse/db</div>
          <div className="col">{prizePerHits3} akcse/db</div>
          <div className="col">{prizePerHits2} akcse/db</div>
          <div className="col">{prizePerHits0} akcse/db</div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <hr />
          </div>
        </div>
        <div className="row align-items-center">
          <strong className="col">Nyeremény (összesen)</strong>
          <div className="col">{totalPrizeForHit5} akcse</div>
          <div className="col">{totalPrizeForHit4} akcse</div>
          <div className="col">{totalPrizeForHit3} akcse</div>
          <div className="col">{totalPrizeForHit2} akcse</div>
          <div className="col">{totalPrizeForHit0} akcse</div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <hr />
          </div>
        </div>
        <br />
        <div>
          <div className="row align-items-center">
            <strong className="col">Szelvények száma</strong>
            <div className="col">{totalBets} db</div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row align-items-center">
            <strong className="col">Bevétel</strong>
            <div className="col">{totalRevenue} akcse</div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row align-items-center">
            <strong className="col">Kifizetett összeg</strong>
            <div className="col">{totalWinPrizes} akcse</div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row align-items-center">
            <strong className="col">Üzemeltető nyeresége</strong>
            <div className="col">{totalProfit} akcse</div>
          </div>
          <div className="row align-items-center mb-5">
            <div className="col">
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatisticsTable;
