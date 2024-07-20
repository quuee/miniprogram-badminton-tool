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
      this.load(this.properties.raceId)
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    load(raceId: number) {
      $api.raceApi.getRaceReferee(raceId)
        .then((res) => {
          if (res.code == 0) {
            // console.log("getRaceTrials",res.data)
            raceRefereeStore.setRaceReferees(res.data)
          }
        })

      
    }
  }
})