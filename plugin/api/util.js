
/**
 * 获取图片信息（宽度高度）
 * by 小林囝 2018-04-27
 */
function _getcanvasheight(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight) {
  if (height == "auto") {
    let tmp = _getcanvaswidth(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight);
    canvasHeight = tmp.canvasWidth * pheight / pwidth;
    height = canvasHeight + "px";
    /**if (width == "auto") {
      canvasHeight = sheight;
      height = sheight + "px";
      canvasWidth = swidth;
    }*/
  } else if (height.indexOf("%") >= 0) {
    canvasHeight = parseFloat(height) / 100 * sheight;
    height = parseFloat(height) / 100 * sheight + "px";
  } else if (height.indexOf("rpx") >= 0) {
    canvasHeight = swidth / 750 * parseFloat(height);
  } else if (height.indexOf("px") >= 0) {
    canvasHeight = parseFloat(height);
  }
  return { "height": height, "canvasHeight": canvasHeight }
}

function _getcanvaswidth(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight) {
  if (width == "auto") {
    if (height == "auto") {
      //canvasWidth = canvasHeight * pwidth / pheight;
      width = "100%";
    } else {
      canvasWidth = sheight * pwidth / pheight;
      if (canvasWidth > swidth) {
        canvasWidth = swidth;
      }
    }
  }
  if (width.indexOf("%") >= 0) {
    canvasWidth = parseFloat(width) / 100 * swidth;
  } else if (width.indexOf("rpx") >= 0) {
    canvasWidth = swidth / 750 * parseFloat(width);
  } else if (width.indexOf("px") >= 0) {
    canvasWidth = parseFloat(width);
  }
  return { "width": width, "canvasWidth": canvasWidth };
}

function getcanvassize(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight) {
  let w = _getcanvaswidth(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight);
  let h = _getcanvasheight(width, height, swidth, sheight, pwidth, pheight, canvasWidth, canvasHeight);
  if (width == "auto") {
    w.canvasWidth = h.canvasHeight * pwidth / pheight;
    //width = "100%";
    if (w.canvasWidth > swidth) {
      w.canvasWidth = swidth;
    }
  }
  return { "width": w.width, "canvasWidth": w.canvasWidth, "height": h.height, "canvasHeight": h.canvasHeight, "sysWidth": swidth, "sysHeight": sheight, "picWidth": pwidth, "picHeight": pheight, }
}

/**
 * 方向相关
 * @param int dataitmp this.data.itmp
 * @param int picLength 图片集长度
 * @param int d 向左还是向右 取值0(左)或1(右)
 * @param int view 视角 取值1~360
 * @@return 
 * by 小林囝 2018-04-29
 */
function direction(dataitmp, picLength, d, view) {
  let itmp = 1;
  if (dataitmp < picLength && dataitmp > 1) {
    if (d == 1) {
      itmp = dataitmp + 1;
    } else {
      itmp = dataitmp - 1
    }
  } else if (dataitmp == 1) {
    if (d == 1) {
      itmp = dataitmp + 1;
    } else {
      if (view == 360) {
        itmp = picLength;
      } else {
        itmp = 1;
      }
    }
  } else if (dataitmp == picLength) {
    if (d == 1) {
      if (view == 360) {
        itmp = 1;
      } else {
        itmp = dataitmp;
      }
    } else {
      itmp = dataitmp - 1;
    }
  } else {
    itmp = 1
  }
  return { itmp: itmp, dataitmp: dataitmp, picLength: picLength, d: d, view: view };
}

/**
 * 获取图片信息包括本地地址
 * @param string src 图片网络地址
 * @@return object
 * by 小林囝 2018-05-04
 */
function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: src,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  })
}
function downloadFile(src) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: src,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject({ statusCode, errMsg });
        }
      },
      fail(err) {
        reject(err);
      }
    });
  })
}

module.exports = {
  getcanvassize: getcanvassize,
  getImageInfo: getImageInfo,
  downloadFile: downloadFile
}