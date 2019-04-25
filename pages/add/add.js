// pages/add/add.js
const app = getApp()
var test = 0
var imgaddr = null
Page({
  data: {
    date: '时间',
    addr_n: 0,
    type_n: 0,
    pick_n: 0,
    name: '',
    addr_array: ['位置', '教学楼', '精工园', '图书馆', '宿舍楼', '其他'],
    type_array: ['类型', '卡', '包', '书', '电子产品', '伞', '其他'],
    pick_array: ['拾取', '丢失'],
    desc: '',
  },

  back: function () {
    wx.navigateBack()
    {
      delta: 1;
    }
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindPickChange: function (e) {
    this.setData({
      pick_n: e.detail.value
    })
  },
  bindAddrChange: function (e) {
    this.setData({
      addr_n: e.detail.value
    })
  },

  bindTypeChange: function (e) {
    this.setData({
      type_n: e.detail.value
    })
  },
  /*
    onLoad: function () {
      // 调用函数时，传入new Date()参数，返回值是日期
      var time = formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        time: time
      });
    },
  */



  formSubmit: function (e) {
    //声明当前执行的
    var that = this;
    //获取表单所有name=keyword的值
    var addr_array = ['位置', '教学楼', '精工园', '图书馆', '宿舍楼', '其他'];
    var type_array = ['类型', '卡', '包', '书', '电子产品', '伞', '其他'];
    var name = e.detail.value.name;
    var desc = e.detail.value.desc;
    var date = e.detail.value.date;
    var pick = e.detail.value.pick
    var coninfo = e.detail.value.coninfo;
    var type = type_array[e.detail.value.type];
    var addr = addr_array[e.detail.value.addr];
    //显示搜索中的提示
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    if (!test) {
      wx.request({
        url: 'https://white.xmutsec.com/test/insert.php',
        method: 'post',
        data: {
          name: name,
          pick: pick,
          desc: desc,
          date: date,
          type: type,
          addr: addr,
          coninfo: coninfo,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {

          //控制台打印（开发调试用）


          //把所有结果存进一个名为re的数组
          that.setData({
            re: res.data,
          })
          console.log(res.data)
          //搜索成功后，隐藏搜索中的提示
          wx.hideLoading();
        }
      })
    }
    else {
      wx.uploadFile({
        url: 'https://white.xmutsec.com/test/insert.php',
        //method: "POST",
        filePath: imgaddr,
        name: 'file',
        formData: {
          name: name,
          pick: pick,
          desc: desc,
          date: date,
          type: type,
          addr: addr,
          coninfo: coninfo,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        //请求成功
        success: function (res) {
          //把所有结果存进一个名为re的数组
          that.setData({
            re: res.data,
          })
          //控制台打印（开发调试用）
          console.log(res.data)



          //搜索成功后，隐藏搜索中的提示
          wx.hideLoading();
        }
      })
    }

  },


  imgPicker: function () {
    var that = this;
    imgaddr = null;
    wx.chooseImage({ //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        //前台显示
        that.setData({
          img: res.tempFilePaths //返回前台{{img}}
        })
        test = 1
        imgaddr = res.tempFilePaths[0];
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

      },

    })
  },
})



/*获取当前日期*/
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
