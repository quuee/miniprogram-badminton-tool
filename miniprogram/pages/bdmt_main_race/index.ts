// pages/bdmt_main_race/index.ts
// import { raceBattleStore } from '../../store/raceBattleStore'
// import { raceStore } from "../../store/raceStore"
// import $api from '../../service/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    // tabList: [
    //   { tabName: "概览", tabType: 1 },
    //   { tabName: "排名", tabType: 2 },
    //   { tabName: "对阵", tabType: 3 },
    //   { tabName: "裁判", tabType: 4 },
    // ],
    showStartRace: false,
    raceId: 0
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad(options: any) {
    console.log(options)
    this.setData({
      raceId: options.raceId
    })
  },
  onShow(){

  },

  changeTab(event: any) {
    console.log("main_race triggerEvent() changeTab", event.detail)
    //triggerEvent() 传过来的参数是event.detail
    this.setData({
      activeIndex: event.detail
    })
  },

})