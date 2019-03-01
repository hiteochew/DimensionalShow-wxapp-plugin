const plugin = requirePlugin("DimensionalShow");

Page({
  data: {
    pics1: [
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
  },

  onLoad: function () {
    let funtmp, profun = [], that = this;

    this.data.pics1.forEach((imageurl, index, array) => {
      funtmp = plugin.downloadFile(imageurl)
      profun.push(
        funtmp.then((imagetmpsrc) => {
          return imagetmpsrc;
        })
      );
    });

    Promise.all(profun).then(function (val) {
      that.setData({
        'pics': val
      });
    });
  }
})