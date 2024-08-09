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
    page: 1,
    loadMoreFlag: true,
    // deviceWindowHeight: 600
  },
  onLoad() {
    checkHasLogined().then((isLogin: boolean) => {
      console.log("home isLogin", isLogin)
      if (isLogin) {
        this.getRaceList()
        // let that = this;
        wx.getSystemInfo({
          success: function (res) {
            console.log("res.windowHeight", res.windowHeight)
            // that.setData({
            //   deviceWindowHeight: res.windowHeight - 100 // 减去触底的高度
            // })
          }
        })
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
    const res = await $api.raceApi.getRaceList(this.data.page, 5);
    if (res.code === 0) {
      let loadMoreFlagState = true;
      if (res.data.records.length < 5) {
        loadMoreFlagState = false;
      }
      this.setData({
        loadMoreFlag: loadMoreFlagState,
        raceList: this.data.raceList.concat(res.data.records),
        page: ++this.data.page
      })
    }

  },
  refresh() {
    this.setData({
      triggered: true,
      raceList: [],
      loadMoreFlag: true,
      page: 1,
    })
    this.getRaceList()
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
  loadMore() {
    console.log("loadMore")
    console.log("loadMoreFlag",this.data.loadMoreFlag)
    if (this.data.loadMoreFlag) {
      this.getRaceList()
    }
  }
})
