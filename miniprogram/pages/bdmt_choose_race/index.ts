// pages/bdmt_choose_race/index.ts
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { RaceMainType } from '../../model'
import $api from '../../service/index'
import { raceSchemeStore } from '../../store/raceSchemeStore'

ComponentWithStore({
  storeBindings: {
    store: raceSchemeStore,
    fields: ['raceSchemeList'],
    actions: ['setRaceSchemeList']
  },
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    raceMainTypeTabList: [
      // { raceMainTypeName: "双打", raceMainType: 1 },
      // { raceMainTypeName: "单打", raceMainType: 2 },
      // { raceMainTypeName: "对抗", raceMainType: 3 },
      // { raceMainTypeName: "团体", raceMainType: 4 },
    ] as Array<RaceMainType>,
  },
  methods: {
    /**
       * 生命周期函数--监听页面加载
       */
    onLoad() {
      let f1 = $api.raceSchemeApi.getMainTypeList()
      let f2 = $api.raceSchemeApi.getRaceSchemeList(1)

      Promise.all([f1, f2]).then((res) => {
        console.log(res)
        if (res[0].code == 0) {
          this.setData({
            raceMainTypeTabList: [...res[0].data]
          })

        }
        if (res[1].code == 0) {
          raceSchemeStore.setRaceSchemeList(res[1].data)
        }
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

    onChange(event: WechatMiniprogram.TouchEvent) {

      const { index } = event.detail;
      const currentTab = this.data.raceMainTypeTabList[index];
      $api.raceSchemeApi.getRaceSchemeList(currentTab.raceMainType).then(
        (res) => {
          // console.log(res)
          if (res.code === 0) {
            raceSchemeStore.setRaceSchemeList(res.data)
          }
        }
      )
    },
  }


})