# 3D环物展示微信小程序插件

小程序3d环物展示插件，利用小程序开放的接口模拟简单的3D环物功能。只需传入物品序列照片数组即可。

插件appid：`wx0f253bdf656bfa08`

版本：`v1.0.1`

微信插件地址：[插件信息](https://mp.weixin.qq.com/wxopen/pluginbasicprofile?action=intro&appid=wx0f253bdf656bfa08&token=1772901724&lang=zh_CN)

# 使用方法

微信小程序后台搜索`3D环物展示`添加插件

## 1. 小程序配置

在`app.json`加入

```
"plugins": {
  "DimensionalShow": {
    "version": "1.0.1",
    "provider": "wx0f253bdf656bfa08"
  }
}
```

## 2. 页面配置

在需要用到插件的page页面的json配置文件中加入，如`pages/index/index.json`

```
"usingComponents": {
  "dimenshow": "plugin://DimensionalShow/dimenshow"
}
```

## 3. 页面使用

### 逻辑层

在页面的js文件中配置**照片地址序列对象**，如 `pages/index/index.js`

由于微信官方规定，downloadFile安全域名需要在插件内设置，所以这里建议大家先在小程序端**设置安全域名**后使用**downloadFile**下载图片序列，再把得到的本地缓存地址集传入插件。

Tip：插件内部已提供支持**Promise**的**downloadFile(url)**接口，可直接使用。

```
//引入插件
const plugin = requirePlugin("DimensionalShow")

Page({
  data: {
    picsWeblink: [
      /**
       * 添加图片地址，建议使用分辨率一致的照片，照片建议使用8张以上
       */
      "https://*****/1.jpg",
      "https://*****/2.jpg",
      "https://*****/3.jpg",
    ]
  },

  onLoad: function () {
    let funtmp, profun = [], that = this
    
    this.data.picsWeblink.forEach((imageurl, index, array) => {
      funtmp = plugin.downloadFile(imageurl)
      profun.push(
        funtmp.then((src) => {
          return src
        })
      );
    });

    Promise.all(profun).then(function (srcs) {
      that.setData({
        'pics': srcs
      });
    });
  }
})
```

### 视图层

在`wxml文件`中，加入组件。

```
<dimenshow width="auto" height="66%" autoplay="" view="360" src="{{pics}}">
  <text style="font-size:15px;line-height:2;margin:6px 9px;display:block;">3D环物插件示例，左右拖动上面试试吧</text>
</dimenshow>
```

Tip：其中`<text>标签`的为自定义内容，可自行添加也可不加。


# 组件参数

属性名 | 类型 | 默认值 | 是否必须 | 说明
---|---|---|---|---
src | Object |  | 是 | 照片序列对象
width | String | 100% | 否 | px、rpx、%
heigth | String | auto | 否 | px、rpx、%
view | Number | 360 | 否 | 视角
moveFre | Number | 16 | 否 | 移动灵敏度(保持默认即可)
autoplay | Boolean | false | 否 | 自动播放

# 插件接口

使用接口前先`const DimenPlugin = requirePlugin("DimensionalShow")` (变量名自行命名~~)

## downloadFile(url)

在微信官方的基础上加上Promise支持，返回是Promise。

**参数说明：**

参数名 | 类型 | 必填 | 说明
---|---|---|---
url | String | 是 | 照片的网络地址

Tip：`url`为单个地址，无法直接传入照片序列。

## getImageInfo(url)

在微信官方的基础上加上Promise支持，返回是Promise。

**参数说明：**

参数名 | 类型 | 必填 | 说明
---|---|---|---
url | String | 是 | 照片的地址，网络地址与缓存地址均可

Tip：`url`为单个地址，无法直接传入照片序列。


# 示例图片

文件名可随意设置，但顺序就需要严格。

![fileList](https://raw.githubusercontent.com/hiteochew/DimensionalShow-wxapp-plugin/master/list.jpg)

```
[
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/1.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/20.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/19.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/18.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/17.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/16.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/15.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/14.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/13.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/12.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/11.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/10.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/9.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/8.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/7.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/6.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/5.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/4.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/3.jpg/h300",
  "https://tapp-1251082889.picgz.myqcloud.com/3d/1/2.jpg/h300"
]
```

# 效果演示

微信扫描下方小程序码或搜索**【揭阳榕城石狮桥】**小程序即可体验

![demo](https://raw.githubusercontent.com/hiteochew/DimensionalShow-wxapp-plugin/master/demo.jpg "揭阳榕城石狮桥小程序码")


# 更新说明
2018-06-08

## 1.0.1

发布时间：2018-6-8
发布说明：A 增加缓存地址的(通过小程序downloadFile接口产生)的支持

## 1.0.0

发布时间：2018-5-25
发布说明：初版

