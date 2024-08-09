## app.json
```json
  "style": "v2",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true,
      "disableABTest": true,
      "sdkVersionBegin": "3.0.0",
      "sdkVersionEnd": "15.255.255"
    }
  },
```

## 构建npm
project.config.json  
```json
"setting": {
  ...
  "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./"
      }
    ]
}

```
重新启动项目，再手动 工具->构建npm

## 页面配置navigationBarTitleText没有效果
app.json
```json
  "window": {
    // 把这里清空，再每个页面配置
  },
```

## wx.relaunch 跳转后导航栏的home按钮路径
```json
pages:[
  // 第一个就是home按钮路径
]
```

## 传值
```typescript
  let battleModelString = JSON.stringify(battleModel) // 转文本
  battleModelString = encodeURIComponent(battleModelString) // 转码

  let battle = JSON.parse(decodeURIComponent(options.battle));// 解码 解析文本为对象
```

## 问题
### 未登录的情况下进入小程序 不会查询首页比赛列表
### vant weapp tab跳转到其他tab，渲染ui界面(貌似解决)
### 手机体验无法访问临时域名
需要手机小程序打开调试模式  
### 小程序配置服务器域名 (微信小程序服务器域名能不能使用cpolar的二级子域名?)
微信小程序的服务器域名配置有一定的限制和要求。根据微信官方的规定，小程序后台服务器域名需要通过ICP备案，并且必须使用HTTPS协议。关于是否可以使用cpolar的子域名，以下是几点需要注意的：

- ICP备案：微信小程序要求服务器域名必须完成ICP备案，这意味着域名需要在中国的服务器上注册，并且完成相关的备案手续。如果cpolar提供的子域名已经完成ICP备案，那么理论上是可行的。
- HTTPS证书：微信小程序要求服务器必须使用HTTPS协议，因此你的cpolar子域名需要配置有效的SSL证书。
微信小程序后台配置：在使用服务器域名之前，需要在微信小程序的管理后台进行配置，将服务器域名添加到白名单中。
- cpolar服务条款：使用cpolar的子域名之前，需要查看cpolar的服务条款，确认是否允许将其子域名用于商业用途，特别是微信小程序这种场景。
- 稳定性与安全性：由于微信小程序对服务器的稳定性与安全性有较高要求，使用第三方服务提供的子域名可能会存在一定的风险，例如服务稳定性、响应速度以及潜在的安全问题。

综上所述，如果cpolar的子域名满足以上条件，并且遵守微信小程序的相关规定，那么理论上是可以在微信小程序中使用cpolar的子域名的。但是，建议直接咨询cpolar的客服或查阅其官方文档，以获取更准确的信息和指导。同时，为了保证服务的稳定性和用户体验，一些开发者可能会选择使用自己的独立域名。
### 小程序 扫普通链接二维码打开小程序 个人开发不支持
