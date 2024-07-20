// pages/bdmt_main_race/index.ts

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
    raceId: null
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
  onTabChange(event: WechatMiniprogram.TouchEvent) {
    console.log("onTabChange", event)
    // 每次切换tab时触发
  },
  changeTab(event: any) {
    console.log("changeTab", event.detail)
    this.setData({
      activeIndex: event.detail
    })
  },

})