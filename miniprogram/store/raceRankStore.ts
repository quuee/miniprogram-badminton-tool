import { observable, action } from 'mobx-miniprogram'
import { RaceRank } from '../model'
import { BehaviorWithStore } from "mobx-miniprogram-bindings"


const raceRankStore = observable({

  raceRanks: [] as RaceRank[],

  setRaceRanks: action(function (this: any, data: RaceRank[]) {
    this.raceRanks = data
  }),

})

const raceRankStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: raceRankStore,
    fields: ["raceRanks"],
    actions: ["setRaceRanks"]
  },
  pageLifetimes: {
    show: function () {
      console.log("raceRankStoreBehavior pageLifetimes show")
    }
  }
})

export {
  raceRankStore, raceRankStoreBehavior
}

