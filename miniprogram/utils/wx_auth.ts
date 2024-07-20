import $api from '../service/index'

/**
 * 检查微信用户登录状态是否有效，由微信维护
 * 除非服务端与小程序API交互需要用session_key时候(例如 获取用户绑定的手机号)，不过期无所谓，* 过期了就重新wx.login，给后台换新的session_key
 */
async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}

/**
 * 检测登录状态，返回 true / false
 */
async function checkHasLogined() {
  const token = wx.getStorageSync('localToken')
  if (!token) {
    return false
  }
  const loggined = await checkSession()
  if (!loggined) {
    wx.removeStorageSync('localToken')
    return false
  }
  // 检查后端返回的token是否过期
  // const checkTokenRes = await WXAPI.checkToken(token)
  // if (checkTokenRes.code != 0) {
  //   wx.removeStorageSync('token')
  //   return false
  // }
  return true
}


/**
 * 微信登录————jsCode
 * @param {*} param 
 */
function wxLogin() {
  wx.login({
    success: async (res1) => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      const response = await $api.userApi.userLogin(res1.code)
      console.log("wxLogin success", response)
      wx.setStorageSync('localToken', response.data);//把token存储在本地
    },
    fail: function (err) {
      wx.showToast({ title: "系统繁忙！", icon: 'none' });
      console.log(err)
    }
  })
}

export { wxLogin, checkHasLogined }