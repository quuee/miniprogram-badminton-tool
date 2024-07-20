import { observable, action } from 'mobx-miniprogram'
import { RaceScheme } from '../model'


export const raceSchemeStore = observable({

  raceSchemeList: [] as RaceScheme[],

  setRaceSchemeList: action(function (this: any, data: Array<RaceScheme>) {
    this.raceSchemeList = [...data]
  }),

  getRaceSchemeListByMainType: action(function(raceMainType:number){
    const filterArr = raceSchemeStore.raceSchemeList.filter((item:RaceScheme)=>{
      if(item.raceMainType == raceMainType){
        return true
      }
      return false
    })
    return filterArr;
  })


})