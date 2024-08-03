// pages/bdmt_race_applicants/index.ts
import $api from '../../service/index'
import { raceStore, raceStoreBehavior } from '../../store/raceStore'
import { UserInfo } from '../../model'

Page({

  behaviors: [raceStoreBehavior],
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
  managePlayers(){
    this.setData({
      showPalyerRemove: !this.data.showPalyerRemove
    })
  },
  async removePlayer(event: WechatMiniprogram.TouchEvent){
    console.log("removePlayer",event)
    const {uid} = event.mark || {}
    let param = {
      raceId:raceStore.raceInfo.raceId,
      playerId:uid
    }
    const res = await $api.raceApi.deletePlayer(param)
    if(res.code == 0){
      const filterArr = this.data.applicants.filter((p)=>{
        if(p.uid == uid){
          return false
        }
        return true
      })

      this.setData({
        applicants : filterArr
      })

      // raceStore.updateRaceApplicants(filterArr)
    }

  },
  onShareAppMessage(res:any){
    console.log("onShareAppMessage",res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:"邀请参赛",
      imageUrl:"",
      path:"/pages/bdmt_main_race/index?raceId="+raceStore.raceInfo.raceId,
      success: function (res:any){

      },
      fail: function(res:any){

      }
    }
  }
})