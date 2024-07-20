import { UserInfo, Referee } from "./userModel";
interface RaceMainType {
  raceMainTypeName: string;
  raceMainType: number;
}
interface RaceScheme {
  schemeId: number;
  raceMainType: number;
  raceScheme: string;
  simpleDesc: string;
  detailDesc: string;
  perSessionNum: number;
  minPlayers: number;
}

interface RaceInfo {
  raceId: number;
  raceTitle: string;
  raceState: number;
  raceDateTime: string;
  raceMainType: number;
  schemeId: number;
  raceBOX: number;
  raceScoreMode: number;
  organizerUid: number;
  predictApplyNum: number;
  genderLimit: number;
  fieldNum: number;
  address: string;
  addContext: string;
  creatTime: string;

  organizer: UserInfo;
  raceScheme: RaceScheme;
  applicants: Array<UserInfo>;
  // rank
  // battles
  // trials

  organization: boolean;
  applied: boolean;
}

interface RaceRank {
  rid: number;
  raceId: number;
  player: UserInfo;
  victories: number;
  failures: number;
  odds: number;
  oddsDifference: number;
}

interface RaceBattle {
  bid: number;
  raceId: number;
  raceMainType: number;
  roundNum: number;
  player1: UserInfo;
  player2: UserInfo;
  firstPartnerScore: number;

  player3: UserInfo;
  player4: UserInfo;
  secondPartnerScore: number;
  battleState: number;
  referee: Referee;
}


type RaceFormData = {
  raceId?: number;
  raceTitle: string;
  raceMainType: number;
  schemeId: number;
  genderLimit: string;
  applicats: number;
  raceBOX: string | number;
  raceScoreMode: string | number;
  raceCalender: string;
  raceTime: string;
  raceAddress: string;
  addContext: string;
}

export {
  RaceInfo, RaceScheme, RaceFormData, RaceMainType, RaceRank, RaceBattle,
}