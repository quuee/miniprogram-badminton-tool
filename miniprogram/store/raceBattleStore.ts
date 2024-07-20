import { observable, action } from 'mobx-miniprogram'
import { RaceBattle } from '../model'

const raceBattleStore = observable({

  raceBattles: [] as RaceBattle[],

  setRaceBattles: action(function (this: any, data: RaceBattle[]) {
    this.raceBattles = data
  }),

  updateRaceBattle: action(function(bid:number,score1:number,score2:number){
    let arr = raceBattleStore.raceBattles.map((b:RaceBattle)=>{
      if(b.bid == bid){
        b.firstPartnerScore = score1;
        b.secondPartnerScore = score2;
        b.battleState = 2
        return b
      }
      return b;
    })
    raceBattleStore.raceBattles = arr
  })

})

export {
  raceBattleStore
}