// components/mainrace-rank/race-rank.ts
import { raceRankStore, raceRankStoreBehavior } from '../../store/raceRankStore'
import $api from '../../service/index'
import { groupBy } from '../../utils/race_util'
import { RaceRank } from '../../model'

Component({
  behaviors: [raceRankStoreBehavior],

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

  /**
   * 组件的初始数据
   */
  data: {

    triggered: false,
    canRefresherEnable: true,
    switchChoose: false,
    maleRanks: [] as RaceRank[],
    femaleRanks: [] as RaceRank[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      $api.raceApi.getRaceRanks(this.properties.raceId)
        .then((res) => {
          if (res.code == 0) {
            raceRankStore.setRaceRanks(res.data)
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
    onSwitchChoose(event: WechatMiniprogram.TouchEvent) {
      // console.log(event.detail)
      this.setData({
        switchChoose: event.detail ? true : false
      })

      // 根据性别分组
      if (this.data.switchChoose) {
        const grouped = groupBy(raceRankStore.raceRanks, (item: RaceRank) => item.player.gender)
        // console.log(grouped)
        this.setData({
          maleRanks: grouped[1],
          femaleRanks: grouped[2]
        })
      }
    }
  }
})