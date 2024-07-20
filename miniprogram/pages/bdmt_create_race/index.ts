// pages/bdmt_create_race/index.ts
import { formatDate } from '../../utils/datetime_util'
import $api from '../../service/index'
import { RaceScheme, RaceFormData, RaceInfo, MyAwesomeData } from '../../model';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';



Page({

  /**
   * 页面的初始数据
   */
  data: {
    raceSchemeList: [
      <RaceScheme>{ schemeId: 1, raceScheme: "八人转/超八转", raceMainType: 1, simpleDesc: "", detailDesc: "" },
      <RaceScheme>{ schemeId: 2, raceScheme: "混双转", raceMainType: 1, simpleDesc: "", detailDesc: "" },
    ],
    raceSchemeVOList: [] as Array<string>,
    raceSchemeIndex: 0,
    genderList: ["不限", "男", "女"],
    genderIndex: 0,
    applicatsList: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    applicatsIndex: 4,
    raceBOList: [
      {
        values: ["一局定胜负", "三局两胜", "五局三胜"],
        defaultIndex: 0 
      },
      {
        values: [11, 15, 21],
        defaultIndex: 2 //打开时默认选中defaultIndex: 2
      }
    ],
    raceBOIndex: 0,
    raceScoreModeIndex: 2, //默认已选中
    raceTimeArr: [
      {
        values: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        defaultIndex: 8
      },
      {
        values: ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
        defaultIndex: 0
      }
    ],
    hourIndex: 8,
    minuteIndex: 0,
    // calender: {},

    formData: <RaceFormData>{
      raceTitle: '',
      raceMainType: 0,
      schemeId: 0,
      genderLimit: "",
      applicats: 8,
      raceBOX: "",
      raceScoreMode: "",
      raceCalender: "",
      raceTime: "",
      raceAddress: "",
      addContext: ""
    },

    showRaceScheme: false,
    showGenderLimit: false,
    showApplicats: false,
    showRaceMode: false,
    showCalender: false,
    showTime: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    const formData = JSON.parse(options.formData)
    console.log("onload:",formData)
    this.setData({
      formData: formData
    })


    let tempList: string[] = this.data.raceSchemeList.map((t) => t.raceScheme);
    this.setData({
      raceSchemeVOList: [...tempList]
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

  showPopup(event: WechatMiniprogram.TouchEvent) {
    console.log("showPopup", event)
    const { showName } = event.mark || {};
    if (showName === "raceScheme") {
      this.setData({
        showRaceScheme: !this.data.showRaceScheme
      })
    }
    if (showName === "genderLimit") {
      this.setData({
        showGenderLimit: !this.data.showGenderLimit
      })
    }
    if (showName === "applicats") {
      this.setData({
        showApplicats: !this.data.showApplicats
      })
    }
    if (showName === "raceMode") {
      this.setData({
        showRaceMode: !this.data.showRaceMode
      })
    }
    if (showName === "showCalender") {
      this.setData({
        showCalender: !this.data.showCalender
      })
    }
    if (showName === "showTime") {
      this.setData({
        showTime: !this.data.showTime
      })
    }
  },
  /**
   * popup关闭都在这里改false
   */
  onClosePopup() {
    this.setData({
      showRaceScheme: false,
      showGenderLimit: false,
      showApplicats: false,
      showRaceMode: false,
      showCalender: false,
      showTime: false,
    })
  },
  async clickCreateRace() {
    // TODO 必填参数校验
    let formData: RaceFormData = {
      raceTitle: this.data.formData.raceTitle,
      raceMainType: this.data.formData.raceMainType,
      schemeId: this.data.raceSchemeList[this.data.raceSchemeIndex].schemeId,
      genderLimit: this.data.genderList[this.data.genderIndex],
      applicats: this.data.applicatsList[this.data.applicatsIndex],
      raceBOX: this.data.raceBOList[0].values[this.data.raceBOIndex],
      raceScoreMode: this.data.raceBOList[1].values[this.data.raceScoreModeIndex],
      raceCalender: this.data.formData.raceCalender,
      raceTime: this.data.raceTimeArr[0].values[this.data.hourIndex] + ":" + this.data.raceTimeArr[1].values[this.data.minuteIndex],
      raceAddress: this.data.formData.raceAddress,
      addContext: this.data.formData.addContext
    }
    if (formData.raceTitle == "") {
      Toast.fail('缺少比赛名称');
      return
    }
    // console.log(formData)
    const res: MyAwesomeData<RaceInfo> = await $api.raceApi.createRace(formData)
    console.log(res.data)
    if (res.code == 0) {
      wx.reLaunch({
        url: `/pages/bdmt_main_race/index?raceId=${res.data.raceId}`
      })
    }

  },
  onRaceTitleBlur(event: WechatMiniprogram.TouchEvent) {
    this.setData({
      "formData.raceTitle": event.detail.value
    })
  },
  onRaceSchemeConfirm(event: WechatMiniprogram.TouchEvent) {
    // console.log("onRaceSchemeConfirm", event)
    this.setData({
      raceSchemeIndex: event.detail.index
    })
    this.onClosePopup()
  },
  onGenderLimitConfirm(event: WechatMiniprogram.TouchEvent) {
    this.setData({
      genderIndex: event.detail.index
    })
    this.onClosePopup()
  },
  onApplicatsConfirm(event: WechatMiniprogram.TouchEvent) {
    this.setData({
      applicatsIndex: event.detail.index
    })
    this.onClosePopup()
  },
  onRaceModeConfirm(event: WechatMiniprogram.TouchEvent) {
    // console.log(event)
    const { value, index } = event.detail;
    this.setData({
      raceBOIndex: index[0],
      raceScoreModeIndex: index[1]
    })
    this.onClosePopup()
  },
  onCalenderConfirm(event: WechatMiniprogram.TouchEvent) {
    console.log("onCalenderConfirm", event)
    const dateString = formatDate(event.detail as Date);
    this.setData({
      // calender: event.detail,
      "formData.raceCalender": dateString
    })
    this.onClosePopup()
  },
  onTimeConfirm(event: WechatMiniprogram.TouchEvent) {
    const { value, index } = event.detail;
    this.setData({
      hourIndex: index[0],
      minuteIndex: index[1]
    })
    this.onClosePopup()
  },

  onAddressBlur(event: WechatMiniprogram.TouchEvent) {
    this.setData({
      "formData.raceAddress": event.detail.value
    })
  },
  onAddContextBlur(event: WechatMiniprogram.TouchEvent) {
    this.setData({
      "formData.addContext": event.detail.value
    })
  }
})