// pages/bdmt_race_battle/index.ts
import $api from '../../service/index'
import { raceBattleStore } from '../../store/raceBattleStore'
import { RaceBattle } from '../../model'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

const raceBattleStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: raceBattleStore,
    fields: { raceBattles: "raceBattles" },
    actions: { setRaceBattles: "setRaceBattles", updateRaceBattle: "updateRaceBattle" }
  },
  pageLifetimes: {
    show: function () {
      console.log("raceBattleBehaviorStore pageLifetimes show")
    }
  }
})

Page({

  behaviors: [raceBattleStoreBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    battleModel: <RaceBattle>{},
    scoreArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    scoreIndexArr: [],

    recordEnable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {

    let battle = JSON.parse(decodeURIComponent(options.battle));
    console.log("race_battle_page onload", battle)
    this.setData({
      battleModel: battle
    })
    // const userInfo = wx.getStorageSync("userInfo");

    if (battle.battleState == 1) {
      // 不能修改比分（需等待完成后可修改比分）
      this.setData({
        recordEnable: false
      })

    }

  },
  tapScorePlus() {
    let arr = this.data.scoreArr
    const tempVal = arr[arr.length - 1] + 1;
    // console.log("tempVal",tempVal)
    arr.push(tempVal)
    this.setData({
      scoreArr: arr
    })
  },
  tapScoreMinus() {
    let arr = this.data.scoreArr.slice(0, this.data.scoreArr.length - 1)
    this.setData({
      scoreArr: arr
    })
  },
  onRecordPickerChange(event: WechatMiniprogram.TouchEvent) {
    console.log("onRecordPickerChange", event)
    this.setData({
      scoreIndexArr: event.detail.value
    })
  },
  tapRecordScore() {

    setTimeout(()=>{
    // 微信滚动太快 value取不到值为0
    // 解决方式1：使用bindstart与bindend事件进行判断，若未触发end事件提示未完成选择，但是用户体验不好；
    // 解决方式2：延时
      console.log("延时1秒")
    },1000)

    const userInfo = wx.getStorageSync("userInfo");
    let param = {
      bid: this.data.battleModel.bid,
      score1: this.data.scoreIndexArr[0],
      score2: this.data.scoreIndexArr[1],
      refereeUid: userInfo.uid
    }
    $api.raceApi.editBattleScore(param)

    // raceBattleStore.updateRaceBattle(param.bid, param.score1, param.score2)
    wx.navigateBack({
      delta: 1
    })
  }
})