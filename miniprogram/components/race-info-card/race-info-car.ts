// components/race-info-card/race-info-car.ts


Component({

  /**
   * 组件的属性列表
   */
  properties: {
    raceItem: {
      type: Object,
      value: {}
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
    clickCardTap(event:WechatMiniprogram.TouchEvent){
      console.log("clickCardTap", event)
      const { raceitemid } = event.currentTarget.dataset || {};
      wx.navigateTo(
        { url: `/pages/bdmt_main_race/index?raceId=${raceitemid}` }
      )
    }
  }
})