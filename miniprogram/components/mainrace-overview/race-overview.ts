// components/mainrace-overview/race_overview.ts

import $api from '../../service/index'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { raceStore, raceStoreBehavior } from '../../store/raceStore'
import { MyAwesomeData, RaceFormData, RaceInfo } from '../../model'
import { getDoublePlayerSession, calcFieldNum, getSinglePlayerSession } from "../../utils/race_util"
import { formatDate, formatDateTime } from '../../utils/datetime_util';

Component({
  behaviors: [raceStoreBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    raceId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showStartRace: false,
    showDataSessions: [] as number[],
    showDatafieldNum: 1,
    showDataBattleGenerate: 1,
    sessionIndex: 0,
    actualFieldNum: 1,

    triggered: false,
    canRefresherEnable: true,
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // 拿不到页面onload方法的参数，组件比页面先一步创建实例
    },
    ready: function () {
      this.load()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      $api.raceApi.getRaceInfo(this.properties.raceId).then((res: MyAwesomeData<RaceInfo>) => {
        if (res.code == 0) {
          raceStore.setRaceInfo(res.data)
        }
      })
    },
    refresh() {
      this.setData({
        triggered: true
      })
      this.load()
      this.setData({
        triggered: false
      })
    },
    async clickApplyRetireRace(event: WechatMiniprogram.TouchEvent) {
      console.log("点击报名", event.mark)
      const { raceId } = event.mark || {};
      const res = await $api.raceApi.applyRetire(raceId);
      console.log("报名返回结果", res)
      if (res.code == 0) {
        Toast.success(res.msg)
      }
      // 更新报名数据
      // raceStore.setRaceInfo()
      this.load();
    },
    toApplicantsPage() {
      let arr = JSON.stringify(raceStore.raceInfo.applicants)
      let arrString = encodeURIComponent(arr)
      wx.navigateTo({
        url: "/pages/bdmt_race_applicants/index?applicants=" + arrString
      })
    },
    clickStartRaceDialog() {
      if (raceStore.raceInfo.applicants.length < raceStore.raceInfo.raceScheme.minPlayers) {
        Toast.fail("人数少于" + raceStore.raceInfo.raceScheme.minPlayers)
        return
      }
      let sessions: number[] = [];
      let fieldNum: number = 1;
      if (raceStore.raceInfo.raceMainType == 1) {
        sessions = getDoublePlayerSession(raceStore.raceInfo.applicants.length)
        fieldNum = calcFieldNum(raceStore.raceInfo.applicants.length,
          raceStore.raceInfo.raceScheme.fieldAccommodatePlayerNum)
      }else if(raceStore.raceInfo.raceMainType == 2){
        sessions = getSinglePlayerSession(raceStore.raceInfo.applicants.length)
        fieldNum = calcFieldNum(raceStore.raceInfo.applicants.length,
          raceStore.raceInfo.raceScheme.fieldAccommodatePlayerNum)
      }

      // console.log("sessions",sessions)
      // console.log("fieldNum",fieldNum)
      this.setData({
        showStartRace: true,
        showDataSessions: sessions,
        showDatafieldNum: fieldNum,
      })
    },
    clickCloseStartRaceDialog() {
      this.setData({
        showStartRace: false
      })
    },
    onFieldNumChange(event: WechatMiniprogram.TouchEvent) {
      // console.log("onFieldNumChange",event.detail.value)
      this.setData({
        actualFieldNum: event.detail.value
      })
    },
    clickStartRace() {
      const param = {
        raceId: raceStore.raceInfo.raceId,
        playerSession: this.data.showDataSessions[this.data.sessionIndex],
        fieldNum: this.data.actualFieldNum,
        battleGenerateAlgorithm: this.data.showDataBattleGenerate
      }
      console.log("clickStartRace param", param)
      $api.raceApi.startRace(param).then((res) => {
        console.log("clickStartRace", res)
        if (res.code == 0) {
          // 跳转到对阵tab标签页，并加载数据更新UI界面
          this.triggerEvent('gotoRaceTab', 2)
          // 开启按钮disable
        }
      })
    },
    async clickDeleteRace() {
      const res: MyAwesomeData<any> = await $api.raceApi.cancleRace(this.data.raceId)
      if (res.code == 0) {
        wx.reLaunch({
          url: "/pages/bdmt_home/index"
        })
      } else {
        Toast.fail(res.msg)
      }

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
    clickGeneratorApplyCode() {
      Toast.fail("功能等待实现")
      // 该方法打开后台生成的二维码

      // 后续流程
      // 小程序平台配置跳转路径
      // 后端生成二维码
      // https://developers.weixin.qq.com/miniprogram/introduction/qrcode.html#%E4%BA%8C%E7%BB%B4%E7%A0%81%E8%B7%B3%E8%BD%AC%E8%A7%84%E5%88%99
      // 在onload方法里提取二维码参数 const q = decodeURIComponent(query.q)
    },
    gotoEditRace() {
      let genderLimit;
      switch (raceStore.raceInfo.genderLimit) {
        default: genderLimit = "不限"; break;
        case 1: genderLimit = "男"; break;
        case 2: genderLimit = "女"; break;
      }
      let date = new Date(raceStore.raceInfo.raceDateTime)
      const dateStr = formatDate(date)
      const timeStr = formatDateTime(date)
      let formData = <RaceFormData>{
        raceId: this.data.raceId,
        raceTitle: raceStore.raceInfo.raceTitle,
        raceMainType: raceStore.raceInfo.raceMainType,
        schemeId: raceStore.raceInfo.schemeId,
        genderLimit: genderLimit,
        applicats: raceStore.raceInfo.predictApplyNum,
        raceBOX: raceStore.raceInfo.raceBOX,
        raceScoreMode: raceStore.raceInfo.raceScoreMode,
        raceCalender: dateStr,
        raceTime: timeStr,
        raceAddress: raceStore.raceInfo.address,
        addContext: raceStore.raceInfo.addContext
      };
      console.log("JSON.stringify(formData)", JSON.stringify(formData))
      const form = encodeURIComponent(JSON.stringify(formData))

      wx.navigateTo({
        url: "/pages/bdmt_create_race/index?formData=" + form
      })
    },


  }
})