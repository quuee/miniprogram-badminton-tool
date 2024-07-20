import { observable, action } from 'mobx-miniprogram'
import { RaceScheme } from '../model'


export const raceSchemeStore = observable({

  raceSchemeList: [],

  // 计算属性
  // get double () {
  //   return this.count * 2
  // },
  setRaceSchemeList: action(function (this: any, data: Array<RaceScheme>) {
    this.raceSchemeList = [...data]
  }),




})