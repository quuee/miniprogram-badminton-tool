interface UserInfo {
  uid: number;
  openid:string;
  nickName: string;
  gender: number;
  avatarUrl: string;
  registerDate: string;
  lastLoginDate: string;
  level: number;
}

type Referee = {
  uid: number;
  openid:string;
  nickName: string;
  gender: number;
  avatarUrl: string;
  level: number;
  master:boolean;
}

type BattleStatistics = {
  totalWins:number;
  totalLosses:number;
  winPercentage:number;
  lossPercentage:number;
}

type AllBattleStatistics = {
  doubles:BattleStatistics;
  singles:BattleStatistics
}

export {
  UserInfo,Referee,BattleStatistics,AllBattleStatistics
}