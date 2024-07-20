Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0, //当前选中
    tabbarList: [
      {
        "id": 0,
        "pagePath": "/pages/bdmt_home/index", // 路径最前面需要加 '/'
        "iconPath": "../assets/icon/select_badminton.png",
        "text": "首页"
      },
      {
        "id": 1,
        "pagePath": "",
        "iconPath": "../assets/icon/launch.png",
        "text": "发起"
      },
      {
        "id": 2,
        "pagePath": "/pages/bdmt_mine/index",
        "iconPath": "../assets/icon/select_me.png",
        "text": "我的"
      },
    ],
    actionSheetShow: false
  },
  lifetimes: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(event: WechatMiniprogram.TouchEvent) {
      // let that:WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance = this;
      // console.log('switchTab', e.currentTarget, 'this.data.selected', this.data.selected)
      // console.log("switchTab",this)
      const { index, url } = event.currentTarget.dataset;
      console.log("switchTab",index, url,"this.data.selected",this.data.selected)
      if (this.data.selected == index || index == undefined) return;
      if (url != "") {
        wx.switchTab({
          url,
          success: (res: any) => { console.log(res) },
          fail: (res: any) => { console.log(res) }
        })

      }
      this.setData({
        selected: index
      })
    },
    clickSheetShow() {
      this.setData({
        actionSheetShow: true
      })
    },
    onSheetClose() {
      this.setData({ actionSheetShow: false });
    },
    clickLaunchRace() {
      this.onSheetClose()
      wx.navigateTo({
        url: '/pages/bdmt_choose_race/index',
      })
    }
  }
})
