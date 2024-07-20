// app.ts

import { checkHasLogined } from "./utils/wx_auth"
import $api from './service/index'

App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    console.log("onLaunch")
    // 未登录情况下 后面的接口也会发起查询
    // 判断是否注册过 登录过
    checkHasLogined().then(async isLogined => {
      console.log("检查是否登录: ", isLogined)
      if (!isLogined) {
        // 发起登录
        wx.login({
          success: async (res1) => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            const response = await $api.userApi.userLogin(res1.code)
            console.log("wxLogin success", response)
            wx.setStorageSync('localToken', response.data);//把token存储在本地
            // debugger
            const res = await $api.userApi.getUserInfo();
            if (res.code == 0) {
              console.log("api.userApi.getUserInfo", res.data)
              wx.setStorageSync("userInfo", res.data)
            }
            // 如果没有用户信息 跳转到获取用户信息页面 头像、昵称、性别
            // let userInfoStr = wx.getStorageSync("userInfo");
            // let userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
            if(this.userInfoReadyCallback){
              this.userInfoReadyCallback
            }

            let userInfo = wx.getStorageSync("userInfo");
            console.log("userInfo", userInfo)
            if (userInfo == null || userInfo.nickName == "" || userInfo.avatarUrl == "") {
              wx.navigateTo({
                url: "/pages/index/index"
              })
            }

          },
          fail: function (err) {
            wx.showToast({ title: "系统繁忙！", icon: 'none' });
            console.log(err)
          }


        })
      }
    })

  },
  onShow() {
    console.log("onShow")

  }
})