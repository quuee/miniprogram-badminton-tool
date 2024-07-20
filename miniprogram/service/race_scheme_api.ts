import { httpRequest, } from './request'
import { RaceScheme, MyAwesomeData,RaceMainType } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host



export default class raceSchemeApi {
  /**
   * @description: 获取比赛方案
   * @return {*}
   */
  static getRaceSchemeList = (raceType: number): Promise<MyAwesomeData<Array<RaceScheme>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceScheme>>(
      baseUrl + `/raceScheme/list/${raceType}`,
      {},
      { header: { ["Authorization"]: token } }
    )

  }

  static getMainTypeList = (): Promise<MyAwesomeData<Array<RaceMainType>>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<Array<RaceMainType>>(
      baseUrl + "/raceScheme/mainTypeList",
      {},
      { header: { ["Authorization"]: token } }
    )

  }


}