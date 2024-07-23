// pages/bdmt_race_applicants/index.ts

import { UserInfo } from '../../model'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applicants: [] as UserInfo[],

    triggered: false,
    canRefresherEnable: true,
    showPalyerRemove: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    
    var arr = JSON.parse(decodeURIComponent(options.applicants));
    console.log(arr)
    this.setData({
      applicants: arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  refresh() {
    this.setData({
      triggered: true
    })
    // this.load()
    this.setData({
      triggered: false
    })
  },
  onScroll(event: WechatMiniprogram.TouchEvent) {
    console.log(event.detail.scrollTop)
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
  managePlayers(){
    this.setData({
      showPalyerRemove: !this.data.showPalyerRemove
    })
  },
  removePlayer(event: WechatMiniprogram.TouchEvent){

  }
})