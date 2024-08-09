/*
 * @Author: caiyongqiang
 * @Date: 2022-10-20 10:46:54
 * @LastEditTime: 2022-10-20 16:58:01
 * @LastEditors: caiyongqiang
 * @Description: 
 */

import userApi from './user_api'
import raceApi from './race_api'
import raceSchemeApi from './race_scheme_api'
import raceBattleApi from './race_battle_api'
import raceRefereeApi from './race_referee_api'
import raceRankApi from './race_rank_api'

class apis {
  /**
   * @description: 用户相关Api
   */
  static userApi = userApi
  static raceApi = raceApi
  static raceSchemeApi = raceSchemeApi
  static raceBattleApi = raceBattleApi
  static raceRefereeApi = raceRefereeApi
  static raceRankApi = raceRankApi
}

export default apis