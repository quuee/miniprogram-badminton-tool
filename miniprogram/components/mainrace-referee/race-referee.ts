// components/mainrace-trial/race-trial.ts

import $api from '../../service/index'
import { raceRefereeStore, raceRefereeStoreBehavior } from '../../store/raceRefereeStore'

Component({

  behaviors: [raceRefereeStoreBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    raceId: {
      type: Number
    }
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
  pageLifetimes:{
    show: function(){
      // this.load(this.properties.raceId)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    triggered: false,
    canRefresherEnable: true,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      $api.raceApi.getRaceReferee(this.properties.raceId)
        .then((res) => {
          if (res.code == 0) {
            // console.log("getRaceTrials",res.data)
            raceRefereeStore.setRaceReferees(res.data)
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
  }
})