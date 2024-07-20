## 官方教程
https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html

## 必须与pages同级

## 文件夹名字必须是custom-tab-bar
```json
  custom-tab-bar/index.js
	custom-tab-bar/index.json
	custom-tab-bar/index.wxml
	custom-tab-bar/index.wxss
```

## 目录下所包含的文件名为 index.后缀

## app.json
```json
"tabBar":{
  "custom": true, //这个加上，其他
}
//另外，不需要在 app.json 的 usingComponents 引入 tabBar 组件，如果你放置目录与命名正确，小程序会自动引入。
```

## 每个tabbar页面的js代码加入
官方是页面的生命周期，这里是组件生命周期
```javascript
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
```