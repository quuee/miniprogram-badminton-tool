// pages/bdmt_create_race/index.ts
import { formatDate } from '../../utils/datetime_util'
import $api from '../../service/index'
import { RaceScheme, RaceFormData, RaceInfo, MyAwesomeData } from '../../model';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';


import { raceSchemeStore } from '../../store/raceSchemeStore'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
const raceSchemeStoreBehavior = BehaviorWithStore({
  storeBindings: [
    {
      store: raceSchemeStore,
      fields: { raceSchemeList: "raceSchemeList" },
      actions: { setRaceSchemeList: "setRaceSchemeList",getRaceSchemeListByMainType:"getRaceSchemeListByMainType" }
    },

  ],
  pageLifetimes: {
    show: function () {
      console.log("raceBattleBehaviorStore pageLifetimes show")
    }
  }
})
Page({
  behaviors: [raceSchemeStoreBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    // raceSchemeList: [
    //   <RaceScheme>{ schemeId: 1, raceScheme: "八人转/超八转", raceMainType: 1, simpleDesc: "", detailDesc: "" },
    //   <RaceScheme>{ schemeId: 2, raceScheme: "混双转", raceMainType: 1, simpleDesc: "", detailDesc: "" },
    // ],
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
        values: ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
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
      raceBOX: 1,
      raceScoreMode: 21,
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
    const formData = JSON.parse(decodeURIComponent(options.formData))
    // console.log("/pages/bdmt_create_race/index?formData onload:", formData)
    console.log("options.formData", formData)

    const filterSchemeArr = raceSchemeStore.getRaceSchemeListByMainType(formData.raceMainType);
    let tempList: string[] = filterSchemeArr.map((t) => t.raceScheme);

    if (formData.raceId != undefined) {
      let raceBOXIndex = 0
      switch (formData.raceBOX) {
        case 1: raceBOXIndex = 0; break
        case 3: raceBOXIndex = 1; break;
        case 5: raceBOXIndex = 2; break;
      }
      this.setData({
        formData: formData,
        raceSchemeIndex: filterSchemeArr.findIndex((item) => item.schemeId == formData.schemeId),
        genderIndex: this.data.genderList.indexOf(formData.genderLimit),
        applicatsIndex: this.data.applicatsList.indexOf(formData.applicats),
        raceBOIndex: raceBOXIndex,
        raceScoreModeIndex: (this.data.raceBOList[1].values as number[]).indexOf(formData.raceScoreMode),
        hourIndex: (this.data.raceTimeArr[0].values as string[]).indexOf(formData.raceTime.split(":")[0]),
        minuteIndex: (this.data.raceTimeArr[1].values as string[]).indexOf(formData.raceTime.split(":")[1]),

        raceSchemeVOList: [...tempList]
      })
    } else {
      this.setData({
        formData: formData,
        raceSchemeVOList: [...tempList]
      })
    }
    console.log("this.data.formData",this.data.formData)
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
    let raceBOX: number;
    switch (this.data.raceBOList[0].values[this.data.raceBOIndex]) {
      default: raceBOX = 1; break;
      case "三局两胜": raceBOX = 3; break;
      case "五局三胜": raceBOX = 5; break;
    }
    // TODO 必填参数校验
    let formData: RaceFormData = {
      raceId: this.data.formData.raceId,
      raceTitle: this.data.formData.raceTitle,
      raceMainType: this.data.formData.raceMainType,
      schemeId: raceSchemeStore.getRaceSchemeListByMainType(this.data.formData.raceMainType)[this.data.raceSchemeIndex].schemeId,
      genderLimit: this.data.genderList[this.data.genderIndex],
      applicats: this.data.applicatsList[this.data.applicatsIndex],
      raceBOX: raceBOX,
      raceScoreMode: (this.data.raceBOList[1].values as number[])[this.data.raceScoreModeIndex],
      raceCalender: this.data.formData.raceCalender,
      raceTime: this.data.raceTimeArr[0].values[this.data.hourIndex] + ":" + this.data.raceTimeArr[1].values[this.data.minuteIndex],
      raceAddress: this.data.formData.raceAddress,
      addContext: this.data.formData.addContext
    }
    console.log("formatData",formData)
    if (formData.raceTitle == "") {
      Toast.fail('缺少比赛名称');
      return
    }
    // console.log(formData)
    let res: MyAwesomeData<RaceInfo>;
    if (formData.raceId != undefined) {
      // update
      res = await $api.raceApi.editRace(formData)
      console.log("editRace",res.data)
    } else {
      res = await $api.raceApi.createRace(formData)
      console.log("createRace",res.data)
    }
    if (res.code == 0) {
      wx.reLaunch({
        url: `/pages/bdmt_main_race/index?raceId=${res.data.raceId}`
      })
    } else {
      Toast.fail(res.msg);
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
    // 失去焦点时触发 有时候直接点确定，不会触发该事件
    this.setData({
      "formData.addContext": event.detail.value
    })
  },
  clickReset() {

  }
})