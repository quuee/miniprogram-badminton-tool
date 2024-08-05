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
### 手机体验无法访问临时域名，需要手机小程序打开调试模式
### 小程序配置服务器域名
