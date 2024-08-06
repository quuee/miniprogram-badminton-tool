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
    tempBattles: [] as RaceBattle[],
    page: 1,
    loadMoreFlag: true,
    deviceWindowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceWindowHeight: res.windowHeight - 10
        })
      }
    })
    this.load()
  },
  load() {
    let userInfo = wx.getStorageSync("userInfo");
    $api.raceApi.getRaceHistory(userInfo.uid, this.data.page, 10)
      .then((res) => {
        if (res.code == 0) {
          let loadMoreFlagState = true;
          if (res.data.total < 10) {
            loadMoreFlagState = false;
          }
          this.setData({
            tempBattles: this.data.tempBattles.concat(res.data.records),
            loadMoreFlag: loadMoreFlagState
          })
        }
      })
  },
  refresh() {
    this.setData({
      triggered: true,
      selectPlayers: [],
      loadMoreFlag: true,
      page: 1,
      tempBattles: [],
    })
    this.load();
    this.setData({
      triggered: false
    })
  },
  onScroll(event: WechatMiniprogram.TouchEvent) {
    // console.log(event.detail.scrollTop)
    if (event.detail.scrollTop <= 45) {
      this.setData({
        canRefresherEnable: true
      })
    } else {
      this.setData({
        canRefresherEnable: false
      })
    }
  },
  // onReachBottom
  loadMore() {
    console.log("loadMore")
    if(this.data.loadMoreFlag){
      this.load()
    }
  }
})