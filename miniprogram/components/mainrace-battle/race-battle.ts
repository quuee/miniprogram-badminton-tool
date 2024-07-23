// components/mainrace-battle/race-battle.ts

import { raceBattleStore } from '../../store/raceBattleStore'
import { raceRefereeStore } from '../../store/raceRefereeStore'
import { raceStore } from '../../store/raceStore'
// import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import $api from '../../service/index'
// import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
import { RaceBattle, UserInfo } from '../../model';


const raceBattleStoreBehavior = BehaviorWithStore({
  storeBindings: [
    {
      store: raceBattleStore,
      fields: { raceBattles: "raceBattles" },
      actions: { setRaceBattles: "setRaceBattles" }
    },
    {
      store: raceRefereeStore,
      fields: { raceReferees: "raceReferees" },
      actions: ["setRaceReferees", "getReferee"]
    },
    {
      store: raceStore,
      fields: { raceInfo: "raceInfo" },
      actions: []
    },
  ],
  pageLifetimes: {
    show: function () {
      console.log("raceBattleStoreBehavior pageLifetimes show")
      
    }
  }
})

Component({
  behaviors: [raceBattleStoreBehavior],

  /**
   * 组件的属性列表，被父组件传入参数
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
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    selectPlayers: [] as UserInfo[],
    triggered: false,
    canRefresherEnable: true,
    tempBattles: [] as RaceBattle[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      $api.raceApi.getRaceBattles(this.properties.raceId)
        .then((res) => {
          if (res.code == 0) {
            raceBattleStore.setRaceBattles(res.data)
            this.setData({
              tempBattles: res.data
            })
          }
        })
    },
    refresh() {
      this.setData({
        triggered: true,
        selectPlayers: []
      })
      this.load();
      this.setData({
        triggered: false
      })
    },
    toRaceBattlePage(event: WechatMiniprogram.TouchEvent) {
      console.log("toRaceBattlePage", event.mark)
      const { battleModel } = event.mark || {}
      const userInfo = wx.getStorageSync("userInfo");
      // 不是裁判，点击记分 去裁判页面申请
      // 已经是裁判，点击记分，如果正在比赛中（记分中），可以进去记分页面，需要等完成后才能修改比分
      const referreeArr = raceRefereeStore.getReferee(userInfo.uid)
      if (referreeArr.length == 0) {
        Dialog.confirm({
          title: '申请裁判',
          message: '申请为裁判',
        })
          .then(() => {
            // on confirm
            // 跳转到裁判tab
            $api.raceApi.applyReferee({ raceId: battleModel.raceId, uid: userInfo.uid })
              .then((res) => {
                if (res.code == 0) {
                  raceRefereeStore.setRaceReferees(res.data)
                  this.triggerEvent('gotoRaceTab', 3)
                }
              })

          })
          .catch(() => {
            // on cancel
          });
      } else {
        let battleModelString = JSON.stringify(battleModel)
        battleModelString = encodeURIComponent(battleModelString)
        wx.navigateTo({
          url: "/pages/bdmt_race_battle_record/index?battle=" + battleModelString
        })
      }
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
    selectPalyerBattle(event: WechatMiniprogram.TouchEvent) {
      console.log("selectPalyerBattle", event.mark)
      const { uid } = event.mark || {}

      // 将选中的选手加入selectPlayers（数组合并去重）
      const filterSelectArr = raceStore.raceInfo.applicants.filter((item: UserInfo) => {
        return item.uid == uid
      })
      let selectPArr = [...this.data.selectPlayers, ...filterSelectArr]
      const obj: { [key: number]: boolean } = {};
      selectPArr = selectPArr.reduce<UserInfo[]>((item, next) => {
        if (!obj[next.uid]) {
          item.push(next)
          obj[next.uid] = true;
        }
        return item;
      }, [])
      console.log("数组合并去重", selectPArr)

      // 根据selectPlayers里的选手过滤
      let filterBattleArr: RaceBattle[] = []
      selectPArr.forEach((selected) => {
        const filterArr = raceBattleStore.raceBattles.filter((item) => {
          const f1 = item.player1.uid == selected.uid
          let f2 = false;
          if(item.player2 != undefined){
            f2 = item.player2.uid == selected.uid
          }
          const f3 = item.player3.uid == selected.uid
          let f4 = false;
          if(item.player4 != undefined){
            f4 = item.player4.uid == selected.uid
          }
          if (f1 || f2 || f3 || f4) {
            return true
          }
          return false
        })
        filterBattleArr = [...filterBattleArr, ...filterArr]
      })

      // 去重
      const obj2: { [key: number]: boolean } = {};
      filterBattleArr = filterBattleArr.reduce<RaceBattle[]>((item, next) => {
        if (!obj2[next.bid]) {
          item.push(next)
          obj2[next.bid] = true;
        }
        return item;
      }, [])
      // TODO 排序

      this.setData({
        tempBattles: filterBattleArr,
        selectPlayers: selectPArr
      })

    },
    clickRemovePlayer(event: WechatMiniprogram.TouchEvent) {
      console.log("clickRemovePlayer", event)
      const { uid } = event.mark || {};
      // 选手信息
      let fliterPlayerArr = this.data.selectPlayers.filter((item: UserInfo) => {
        if (item.uid == uid) {
          return false
        }
        return true;
      })

      // 对阵信息
      let filterBattleArr: RaceBattle[] = []
      fliterPlayerArr.forEach((selected) => {
        const filterArr = raceBattleStore.raceBattles.filter((item) => {
          const f1 = item.player1.uid == selected.uid
          let f2 = false;
          if(item.player2 != undefined){
            f2 = item.player2.uid == selected.uid
          }
          const f3 = item.player3.uid == selected.uid
          let f4 = false;
          if(item.player4 != undefined){
            f4 = item.player4.uid == selected.uid
          }
          if (f1 || f2 || f3 || f4) {
            return true
          }
          return false
        })
        filterBattleArr = [...filterBattleArr, ...filterArr]
      })

      // 去重
      const obj2: { [key: number]: boolean } = {};
      filterBattleArr = filterBattleArr.reduce<RaceBattle[]>((item, next) => {
        if (!obj2[next.bid]) {
          item.push(next)
          obj2[next.bid] = true;
        }
        return item;
      }, [])
      if(filterBattleArr.length == 0){
        filterBattleArr = raceBattleStore.raceBattles
      }

      this.setData({
        selectPlayers: fliterPlayerArr,
        tempBattles: filterBattleArr,
      })

    },

  }
})