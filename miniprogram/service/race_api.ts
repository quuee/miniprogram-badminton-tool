import { httpRequest } from './request'
import { RaceInfo, RaceFormData, MyAwesomeData, RaceBattle, RaceRank, Referee } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host

export default class raceApi {
  /**
   * @description: 获取比赛列表信息
   * @return {*}
   */
  static getRaceList = (): Promise<MyAwesomeData<Array<RaceInfo>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceInfo>>(
      baseUrl + '/raceIndex/raceList',
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 创建比赛
   * @param raceFormData 
   */
  static createRace = (raceFormData: RaceFormData): Promise<MyAwesomeData<RaceInfo>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<RaceInfo>(
      baseUrl + '/raceIndex/createRace',
      raceFormData,
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 编辑比赛
   * @param raceFormData 
   */
  static editRace = (raceFormData: RaceFormData): Promise<MyAwesomeData<RaceInfo>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<RaceInfo>(
      baseUrl + '/raceInfo/editRace',
      raceFormData,
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 取消比赛
   * @param raceFormData 
   */
  static cancleRace = (raceId: number): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.delete<any>(
      baseUrl + '/raceInfo/deleteRace?raceId='+raceId,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 获取比赛概览信息
   * @param raceId 
   */
  static getRaceInfo = (raceId: number): Promise<MyAwesomeData<RaceInfo>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<RaceInfo>(
      baseUrl + `/raceInfo/${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 报名 / 退赛
   * @param raceId 
   */
  static applyRetire = (raceId: number): Promise<MyAwesomeData<RaceInfo>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<RaceInfo>(
      baseUrl + `/raceInfo/applyRetire/${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 开启比赛
   * @param data 
   */
  static startRace = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<any>(
      baseUrl + `/raceInfo/startRace`,
      data,
      { header: { ["Authorization"]: token } }
    )
  }

  // 获取比赛对阵信息
  static getRaceBattles = (raceId: number): Promise<MyAwesomeData<Array<RaceBattle>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceBattle>>(
      baseUrl + "/raceInfo/getBattles?raceId=" + raceId,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  // 获取比赛排名信息
  static getRaceRanks = (raceId: number): Promise<MyAwesomeData<Array<RaceRank>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceRank>>(
      baseUrl + `/raceInfo/getRanks?raceId=${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  // 获取比赛裁判
  static getRaceReferee = (raceId: number): Promise<MyAwesomeData<Array<Referee>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<Referee>>(
      baseUrl + `/raceInfo/getReferees?raceId=${raceId}`,
      {},
      { header: { ["Authorization"]: token } }
    )
  }

  /**
   * 修改对阵比分的记录状态
   * @param data bid对阵id uid裁判id
   */
  static applyReferee = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<any>(
      baseUrl + "/raceInfo/applyReferee",
      data,
      { header: { ["Authorization"]: token } }
    )
  }
  // 修改比分
  static editBattleScore = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post<any>(
      baseUrl + `/raceInfo/editBattleScore`,
      data,
      { header: { ["Authorization"]: token } }
    )
  }
}