import { httpRequest } from './request'
import { RaceInfo, RaceFormData, MyAwesomeData,PageResult, RaceRank } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host

export default class raceApi {
  /**
   * @description: 获取比赛列表信息
   * @return {*}
   */
  static getRaceList = (pageNo:number,pageLimit:number): Promise<MyAwesomeData<PageResult<RaceInfo>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<PageResult<RaceInfo>>(
      baseUrl + `/raceIndex/raceList?pageNo=${pageNo}&pageLimit=${pageLimit}`,
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
    return httpRequest.put<any>(
      baseUrl + '/raceInfo/cancelRace?raceId='+raceId,
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


  /**
   * 删除比赛中的选手
   * @param data 
   */
  static deletePlayer = (data: any): Promise<MyAwesomeData<any>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.delete<any>(
      baseUrl + `/raceInfo/deletePlayer`,
      data,
      { header: { ["Authorization"]: token } }
    )
  }


}