import { RaceBattle } from "../../model";
import $api from '../../service/index';

// pages/bdmt_race_history/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    raceBattles: [] as RaceBattle[],
    triggered: false,
    canRefresherEnable: true,
    tempBattles: [] as RaceBattle[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.load()
  },
  load() {
    let userInfo = wx.getStorageSync("userInfo");
    $api.raceApi.getRaceHistory(userInfo.uid)
      .then((res) => {
        if (res.code == 0) {
          this.setData({
            tempBattles: res.data
          })
        }
      })
  },
  refresh() {
    this.setData({
      triggered: true,
      selectPlayers: []
    })
    this.load();
    this.setData({
      triggered: false
    })
  },
  
})