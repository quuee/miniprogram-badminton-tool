import { httpRequest } from './request'
import { RaceInfo, RaceFormData, MyAwesomeData,PageResult, RaceBattle, RaceRank, Referee } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host

export default class raceRefereeApi {



  /**
   * 获取比赛裁判
   * @param raceId 
   */
  static getRaceReferee = (raceId: number): Promise<MyAwesomeData<Array<Referee>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<Referee>>(
      baseUrl + `/referee/getReferees?raceId=${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 同时申请为裁判
   * @param data bid对阵id uid裁判id
   */
  static applyReferee = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<any>(
      baseUrl + "/referee/applyReferee",
      data,
      { header: { ["Authorization"]: token } }
    )
  }


    /**
   * 删除比赛中的裁判
   * @param data 
   */
  static deleteReferee = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.delete<any>(
      baseUrl + `/referee/deleteReferee`,
      data,
      { header: { ["Authorization"]: token } }
    )
  }


}