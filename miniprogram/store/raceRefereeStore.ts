import { observable, action } from 'mobx-miniprogram'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { Referee } from '../model'



const raceRefereeStore = observable({

  raceReferees: [] as Referee[],

  setRaceReferees: action(function (this: any, data: Referee[]) {
    this.raceReferees = data
  }),

  getReferee: action(function (uid: number) {
    // console.log("raceRefereeStore",this.raceReferees)
    const filterArr = raceRefereeStore.raceReferees.filter((r: Referee) =>{
      // console.log("r.uid == uid",r.uid == uid)
      if(r.master){
        return r.uid == uid
      }
      return false
    })
    // console.log("filterArr",filterArr)
    return filterArr
  })

})

const raceRefereeStoreBehavior = BehaviorWithStore({
  storeBindings: {
    store: raceRefereeStore,
    fields: ["raceReferees"],
    actions: ["setRaceReferees", "getReferee"]
  },
  pageLifetimes: {
    show: function () {
      console.log("raceRefereeStoreBehavior pageLifetimes show")
    }
  }
})

export {
  raceRefereeStore, raceRefereeStoreBehavior
}