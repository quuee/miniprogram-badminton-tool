// components/race-format-card/race-format-card.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    raceSchemeItem: {
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
    cilckLaunch(event: WechatMiniprogram.TouchEvent) {
      console.log("cilckLaunch", event)
      const { raceMainType } = event.mark || {};
      let formData = {
        raceMainType : raceMainType
      }
      const formDataStr = encodeURIComponent(JSON.stringify(formData))
      wx.navigateTo(
        { url: `/pages/bdmt_create_race/index?formData=${formDataStr}` }
      )
    }
  }
})