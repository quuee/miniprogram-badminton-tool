// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

import $api from '../../service/index'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      gender: 0,
    },
    base64AvatarUrl:""
    // hasUserInfo: false,
    // canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    // canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {

    onLoad(){
      $api.userApi.getUserInfo().then((res)=>{
        if(res.code == 0){
          this.setData({
            "userInfo.nickName":res.data.nickName,
            "userInfo.avatarUrl":res.data.avatarUrl,
            "userInfo.gender":res.data.gender,
          })
        }
      })
    },
    
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      // 转成base64
      const baseImage = wx.getFileSystemManager().readFileSync(avatarUrl,"base64");
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        base64AvatarUrl: "data:image/png;base64,"+baseImage,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
      })
    },
    onGenderChange(e:any){
      let gender = e.detail.value;
      this.setData({
        "userInfo.gender": gender,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo
          })
        }
      }) 
    },
    clickSave(){
      // wx.setStorageSync("userInfo",this.data.userInfo)
      // 上传到服务器
      $api.userApi.uploadUserInfo(this.data.userInfo.nickName,this.data.base64AvatarUrl,this.data.userInfo.gender)

      wx.reLaunch({
        url: "/pages/bdmt_home/index"
      })
    }
  },
})
