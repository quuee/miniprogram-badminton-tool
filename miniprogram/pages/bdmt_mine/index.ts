// pages/bdmt_mine/index.ts

import { userStore } from '../../store/userStore'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
import $api from '../../service/index'

const userInfoStoreBehavior = BehaviorWithStore({
  storeBindings: [
    {
      store: userStore,
      fields: { userInfo: "userInfo" },
      actions: { setUserInfo: "setUserInfo" }
    },

  ],
  pageLifetimes: {
    show: function () {
      console.log("userInfoStoreBehavior pageLifetimes show")
    }
  }
})

Page({
  behaviors: [userInfoStoreBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    allBattleStatistics:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadUserInfo()

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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  
  async loadUserInfo(){
    const res = await $api.userApi.getUserInfo()
    const resStatics = await $api.userApi.battleStatistics()
    if(res.code == 0){
      userStore.setUserInfo(res.data)
    }
    if(resStatics.code == 0){
      this.setData({
        allBattleStatistics : resStatics.data
      })
    }
  },
  toEditUserInfo(){
    wx.navigateTo({
      url:"/pages/index/index"
    })
  },
  toRaceHistory(){
    wx.navigateTo({
      url:"/pages/bdmt_race_history/index"
    })
  }
})