import { observable, action } from 'mobx-miniprogram'
import { RaceInfo } from '../model'
import { BehaviorWithStore } from "mobx-miniprogram-bindings"


const raceStore = observable({

  raceInfo: <RaceInfo>{},

  setRaceInfo: action(function (this: any, data: RaceInfo) {
    this.raceInfo = data
  }),

})

const raceStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: raceStore,
    fields: ["raceInfo"],
    actions: ["setRaceInfo"]
  },
  pageLifetimes: {
    show: function () {
      console.log("raceStoreBehavior pageLifetimes show")
    }
  }
})

export {
  raceStore,raceStoreBehavior
}