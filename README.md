# 3D环物展示微信小程序插件

小程序3d环物展示插件，利用小程序开放的接口模拟简单的3D环物功能。只需传入物品序列照片数组即可。

插件appid：`wx0f253bdf656bfa08`

版本：`v1.0.0`

# 使用方法

1、微信小程序后台搜索`3D环物展示`添加插件

2、在`app.json`加入

```
"plugins": {
   "DimensionalShow": {
      "version": "1.0.0",
      "provider": "wx0f253bdf656bfa08"
   }
}
```

3、在需要用到插件的page页面的json配置文件中加入，如`pages/index/index.json`

```
"usingComponents": {
    "dimenshow": "plugin://DimensionalShow/dimenshow"
  }
```

4、在页面的js文件中配置照片地址序列对象，如 `pages/index/index.js`

```
Page({
  data: {
    pics: [
      "https://*****/1.jpg",
      /**
       * 添加图片地址，建议使用分辨率一致的照片，照片建议使用8张以上
      */
    ]
  },

  onLoad: function () {
  }
})
```

5、在`wxml文件`中，加入组件，
组件内可写上自定义内容，如说明、标题之类


属性名 | 类型 | 默认值 | 是否必须 | 说明
---|---|---|---|---
src | Object |  | 是 | 照片序列对象
width | String | 100% | 否 | px、rpx、%
heigth | String | auto | 否 | px、rpx、%
view | Number | 360 | 否 | 视角
autoplay | Boolean | false | 否 | 自动播放



```
<dimenshow width="auto" height="66%" autoplay="" view="360" src="{{pics}}">
   <text style="font-size:15px;line-height:2;margin:6px 9px;display:block;">3D环物插件示例，左右拖动上面试试吧</text>
</dimenshow>
```

# 小程序演示

![小程序演示](https://raw.githubusercontent.com/hiteochew/DimensionalShow-wxapp-plugin/master/demo.jpg "小程序演示")
