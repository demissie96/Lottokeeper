type UserDetail = {
  ID?: number;
  Name?: string;
  Balance?: number;
};

type BettingData = {
  ID: number;
  User_ID: number;
  Num_1: number;
  Num_2: number;
  Num_3: number;
  Num_4: number;
  Num_5: number;
  Hit?: number;
  Reward?: number;
  Betting_Date?: number;
};

type WinnerNumbersData = {
  Num_1: number;
  Num_2: number;
  Num_3: number;
  Num_4: number;
  Num_5: number;
};

type IDHitData = {
  ID: number;
  Hit: number;
  User_ID: number;
};

type IDHitRewardData = {
  ID: number;
  Hit: number;
  Reward: number;
  User_ID: number;
};
