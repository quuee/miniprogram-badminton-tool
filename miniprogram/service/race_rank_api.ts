import { httpRequest } from './request'
import { MyAwesomeData, RaceRank } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host

export default class raceRankApi {
  
  /**
   * 获取比赛排名信息
   * @param raceId 
   */
  static getRaceRanks = (raceId: number): Promise<MyAwesomeData<Array<RaceRank>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceRank>>(
      baseUrl + `/rank/getRanks?raceId=${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }


}