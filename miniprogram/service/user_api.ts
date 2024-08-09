import { httpRequest } from './request'
import { UserInfo, MyAwesomeData, AllBattleStatistics } from '../model'

const baseUrl = require('./env').allBaseUrl.GDEnvs.host


export default class userApi {
  /**
   * @description: 获取用户信息
   * @return {*}
   */
  static getUserInfo = (): Promise<MyAwesomeData<UserInfo>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<UserInfo>(
      baseUrl + '/user/get',
      {},
      { header: { ["Authorization"]: token } }
    )

  }

  /**
   * 对阵胜负统计
   */
  static battleStatistics = (): Promise<MyAwesomeData<AllBattleStatistics>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.get<AllBattleStatistics>(
      baseUrl + '/user/battleStatistics',
      {},
      { header: { ["Authorization"]: token } }
    )

  }

  static userLogin = (code: string): Promise<MyAwesomeData<any>> => {
    return httpRequest.post(baseUrl + '/wx_user/login', { jsCode: code })
  }

  static uploadUserInfo = (nickName: string, avatarUrl: string, gender: number): Promise<MyAwesomeData<string>> => {
    const token = wx.getStorageSync("localToken")
    return httpRequest.post(baseUrl + '/user/uploadUserInfo', { nickName, avatarUrl, gender }, { header: { ["Authorization"]: token } })
  }
}