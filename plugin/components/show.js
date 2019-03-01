const util = require("../api/util.js");
let systemInfo = { windowWidth: 300, windowHeight: 360 };
let [context, timer, movex, movey, timeStamp6ab, stagesizetmp, stagesizetmpn, scale] = ["", 0, 0, 0, 0, , 0, 1];
let [errNum, errMsg] = [0, ""];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: '100%',
      observer: function (newVal, oldVal) {
        this.setData({ 'xWidth': newVal })
      }
    },
    height: {
      type: String,
      value: 'auto',
      observer: function (newVal, oldVal) {
        this.setData({ 'xHeight': newVal })
      }
    },
    view: {
      type: Number,
      value: 360,
      observer: function (newVal, oldVal) {
        if (typeof (newVal) == "number" && newVal > 0 && newVal <= 360) {
          this.setData({
            "view": newVal
          });
        } else {
          errNum = 1004;
          errMsg = "视角参数不正确";
          this._showError();
        }
      }
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    moveFre: {
      type: Number,
      value: 16
    },
    bgimg: {
      type: String,
      value: "",
      observer: function (newVal, oldVal){
        if (typeof (newVal) == "String" && newVal) {
          this.setData({
            "bgimg": newVal
          });
        }
      }
    },
    src: {
      type: Object,
      value: [
        /*{index: 0,
        url: '',
        info: {
          path: '',
          width: 300,
          height: 360
        }}*/
      ],
      observer: '_srcChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picsrcs: [],
    itmp: 1,
    stmp: 0,
    canvasWidth: 300,
    canvasHeight: 150,
    xWidth: "100%",
    xHeight: "auto",
    picinfo: { errMsg, width: 300, height: 360, type: '', path: '', orientation: '' }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 向左转
     * by 小林囝 2018-04-29
     */
    turnLeft: function () {
      this._drawimage(context);
      this._tempdirection(0);
    },

    /**
     * 向右转
     * by 小林囝 2018-04-29
     */
    turnRight: function () {
      this._drawimage(context);
      this._tempdirection(1);
    },

    /**
     * 自动播放
     * 1向左，0向右
     * by 小林囝 2018-04-23
     */
    autoplay: function (d) {
      let that = this;
      if (!timer) {
        timer = setInterval(
          function () {
            if (d) {
              that.turnLeft();
            } else {
              that.turnRight();
            }
          }, 212
        );
      } else {
        clearInterval(timer);
        timer = 0;
      }
    },

    /**
     * canvas开始触摸移动事件,记录x，y
     * return x,y
     * by 小林囝 2018-02-25
     */
    starttouchmove: function (e) {
      if (timer) {
        clearInterval(timer);
      }
      movex = e.touches[0].x;
      movey = e.touches[0].y;
      return { x: movex, y: movey }
    },
    endtouchmove: function (e) {
    },

    /**
     * canvas触摸移动事件
     * 进行移动距离移动时间判断筛选并更新时间戳
     * by 小林囝 2018-02-25
     */
    touchmove: function (e) {
      let that = this;
      if (errNum) {
        return that._showError();
      }
      if (e.timeStamp - timeStamp6ab > this.data.moveFre) {
        if (scale == 1) {
          if (e.touches[0].x - movex > 0) {
            that.turnRight();
          } else if (e.touches[0].x - movex < 0) {
            that.turnLeft();
          }
        } else {
          context.scale(2, 2)
        }
      }
      timeStamp6ab = e.timeStamp;
    },

    /**
     * 计算canvas尺寸
     * by 小林囝 2018-04-29
     */
    getstagesize: function () {
      let width = this.data.width, height = this.data.height;
      let canvasWidth = this.data.canvasWidth, canvasHeight = this.data.canvasHeight;
      let size = util.getcanvassize(width, height, systemInfo.windowWidth, systemInfo.windowHeight, this.data.picinfo.width, this.data.picinfo.height, canvasWidth, canvasHeight);
      this.setData({
        "canvasWidth": size.canvasWidth,
        "canvasHeight": size.canvasHeight,
        "xHeight": size.height,
        "xWidth": size.width
      });
      return size;
    },


    /**
     * 创建环视舞台
     * by 小林囝 2018-04-29
     */
    create: function (picsrcs) {
      let that = this;
      return this._cacheImage(picsrcs)
        .then((val) => {
          wx.showLoading({ title: "处理中", mask: true });
          stagesizetmp = that.getstagesize();
          wx.hideLoading();
        })
        .catch((err) => {
          errNum = 1002
          errMsg = "图片序列获取失败";
          that._showError();
          return err;
        });
    },

    /**
     * 更新canvas
     * c为canvas实例化对象，即上面的context
     * by 小林囝 2018-02-25
     */
    _drawimage: function (c) {
      if (((systemInfo.windowWidth - (stagesizetmp.canvasHeight * this.data.picinfo.width / this.data.picinfo.height)) / 2) > 0 && this.data.width == "auto") {
        stagesizetmpn = (systemInfo.windowWidth - (stagesizetmp.canvasHeight * this.data.picinfo.width / this.data.picinfo.height)) / 2;
      }
      c.drawImage(this.data.picsrcs[this.data.itmp - 1].info.path, stagesizetmpn, 0, parseFloat(this.data.canvasWidth), parseFloat(this.data.canvasHeight));
      c.draw();
    },

    /**
     * 显示哪一张
     * d为向左还是向右
     * by 小林囝 2018-04-29
     */
    _tempdirection: function (d) {
      let picLength = this.data.picsrcs.length;
      let view = this.data.view;
      let itmp = 1;

      if (this.data.itmp < picLength && this.data.itmp > 1) {
        if (d == 1) {
          itmp = this.data.itmp + 1;
        } else {
          itmp = this.data.itmp - 1
        }
      } else if (this.data.itmp == 1) {
        if (d == 1) {
          itmp = this.data.itmp + 1;
        } else {
          if (view == 360) {
            itmp = picLength;
          } else {
            itmp = 1;
          }
        }
      } else if (this.data.itmp == picLength) {
        if (d == 1) {
          if (view == 360) {
            itmp = 1;
          } else {
            itmp = this.data.itmp;
          }
        } else {
          itmp = this.data.itmp - 1;
        }
      } else {
        itmp = 1
      }
      this.setData({
        itmp: itmp
      });
      return itmp;
    },

    /**
     * 缓存照片并获取照片尺寸信息
     * by 小林囝 2018-02-25
     */
    _cacheImage: function (src) {
      wx.showLoading({ title: "载入中", mask: true });
      let [that, returndata, profun, funtmp] = [this, [], [],]

      if (src[0]) {
        src.forEach((imageurl, index, array) => {
          if (imageurl.includes('tmp')) {
            funtmp = util.getImageInfo(imageurl)
            //console.info('tmp',imageurl,funtmp)
          } else {
            funtmp = util.downloadFile(imageurl).then((imagetmpsrc) => { return util.getImageInfo(imagetmpsrc) })
            //console.info('notmp', imageurl, funtmp)
          }

          profun.push(
            funtmp.then((imagetmpInfo) => {
              return { index, url: imageurl, info: imagetmpInfo };
            }).catch((err) => reject(err))
          );
        });
        return Promise.all(profun).then(function (val) {
          wx.hideLoading();
          that.setData({
            'picinfo': val[0].info,
            'picsrcs': val
          });
          errNum = 0;
          return val;
        }).catch((err) => {
          errNum = 1006;
          errMsg = "获取资源失败";
          wx.hideLoading();
          that.setData({
            'xHeight': '300rpx'
          });
          that._showError();
          reject(err);
        })
      } else {
        return new Promise((resolve, reject) => {
          errNum = 1006;
          errMsg = "获取资源失败";
          wx.hideLoading();
          that.setData({
            'picinfo': { path: '', width: 300, height: 360 },
            'picsrcs': [{ index: 0, url: '', info: { path: '', width: 300, height: 360 } }],
            'xHeight': '300rpx'
          });
          that._showError();
          reject(err);
        })
      }
    },

    /**
     * 验证数据
     * by 小林囝 2018-04-23
     */
    _verify: function (newVal) {
      if (typeof (newVal) == "object") {
        if (!newVal) {
          errNum = 1002;
          errMsg = "讨厌啦，都不给图仁家";
          this._showError();
        } else {
          errNum = 0;
          errMsg = "";
        }
      } else {
        errNum = 1001;
        errMsg = "你的地址类型有点问题喔";
        this._showError();
      }
      return errNum;
    },

    _srcChange: function (newVal, oldVal) {
      let that = this;
      if (newVal && !this._verify(newVal)) {
        if (typeof newVal[0] !== 'undefined') {
          this.setData({
            "picsrcs": newVal
          });
        } else {
          errNum = 1002
          errMsg = "讨厌，都不给图仁家";
          this._showError();
        }
        this.create(newVal).then(function () {
          if (!errNum) {
            if (that.data.autoplay) {
              that.autoplay(1);
            } else {
              that._drawimage(context);
            }
          } else {
            that._showError();
          }
        });
      } else {
        this.setData({
          "picsrcs": oldVal
        });
      }
    },

    /**
     * 显示错误
     * by 小林囝 2018-04-23
     */
    _showError: function () {
      context.fillStyle = 'Salmon';
      context.setFontSize(16);
      context.setTextAlign('left');
      context.fillText(errNum + ':' + errMsg, 80, 50);
      context.draw();
      throw new Error(errNum + ':' + errMsg);
    }
  },

  /**
   * 生命周期函数
   */
  created: function () {
    systemInfo = wx.getSystemInfoSync();
  },
  attached: function () {
    let that = this;
    context = wx.createCanvasContext('DimenPlayerCanvas', this);

    /*let s_fun = function () {
      wx.showLoading({ title: "处理中", mask: true });
      if (!errNum) {
        stagesizetmp = that.getstagesize();
        if (that.data.autoplay) {
          that.autoplay(1);
        } else {
          that._drawimage(context);
        }
      } else {
        that._showError();
      }
      wx.hideLoading();
    }*/
    /*if (typeof this.data.src[0] !== 'undefined') {
      this._cacheImage(this.data.src)
        .then(s_fun)
        .catch((err) => {
          errNum = 1002
          errMsg = "讨厌，都不给图仁家";
          throw new Error(err);
        });
    } else {
      errNum = 1002
      errMsg = "讨厌，都不给图仁家";
      stagesizetmp = that.getstagesize();
      this._showError();
    }*/
  },
  ready: function () {
  },
})