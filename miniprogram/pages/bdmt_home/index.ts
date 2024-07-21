// pages/bdmt_home/index.ts

import $api from '../../service/index'
import { RaceInfo } from '../../model'
import { checkHasLogined, } from "../../utils/wx_auth"

Page({
  data: {
    activeIndex: 0,
    tabList: [
      { tabName: "比赛", tabType: 1 },
      { tabName: "活动", tabType: 2 },
      { tabName: "俱乐部", tabType: 3 },
    ],
    raceList: [] as RaceInfo[],
    triggered: false,
    canRefresherEnable: true,
  },
  onLoad() {
    checkHasLogined().then((isLogin: boolean) => {
      console.log("home isLogin", isLogin)
      if (isLogin) {
        this.getRaceList()
      }
    })
  },
  onReady() {
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  async getRaceList() {
    this.setData({
      triggered: true
    })
    const res = await $api.raceApi.getRaceList();
    if (res.code === 0) {
      this.setData({
        raceList: [...res.data]
      })
    }
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
})
