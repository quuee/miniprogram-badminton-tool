import { observable, action } from 'mobx-miniprogram'
import { UserInfo } from '../model'


export const userStore = observable({
  userInfo:<UserInfo>{},

  setUserInfo: action(function (this: any, data: UserInfo) {
    this.userInfo = data
  }),



})