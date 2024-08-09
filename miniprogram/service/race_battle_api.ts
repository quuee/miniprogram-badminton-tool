import { httpRequest } from './request'
import { MyAwesomeData,PageResult, RaceBattle} from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host

export default class raceBattleApi {


  /**
   * 获取比赛对阵信息
   * @param raceId 
   */
  static getRaceBattles = (raceId: number): Promise<MyAwesomeData<Array<RaceBattle>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceBattle>>(
      baseUrl + "/battle/getBattles?raceId=" + raceId,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 修改比分
   * @param data 
   */
  static editBattleScore = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<any>(
      baseUrl + `/battle/editBattleScore`,
      data,
      { header: { ["Authorization"]: token } }
    )
  }


  /**
   * 比赛历史
   * @param playerId 选手id
   */
  static getRaceHistory = (playerId:number,pageNo:number,pageLimit:number): Promise<MyAwesomeData<PageResult<RaceBattle>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<PageResult<RaceBattle>>(
      baseUrl + `/battle/raceHistory?playerId=${playerId}&pageNo=${pageNo}&pageLimit=${pageLimit}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

}