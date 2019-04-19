var app = getApp()
var test1 = 0
var test2 = 0
var test3 = 0 //位置
var test4 = 0 //类型
Page
  ({
    data: {
      date: '时间',
      array: ['升序', '降序'],
      data_n: 0,
      addr_n: 0,
      type_n: 0,
      addr_array: ['位置', '教学楼', '精工园', '图书馆', '宿舍楼', '其他'],
      type_array: ['类型', '卡', '包', '书', '电子产品', '伞', '其他'],
      search_result: '',
    },

    bindPickerChange: function (e) {
      this.setData({
        data_n: e.detail.value,
        test2: e.detail.value
      })
    },

    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindAddrChange: function (e) {
      test3 = e.detail.value
      var that = this;
      var addr_n = e.detail.value
      this.setData({
        addr_n: addr_n
      })
      if (addr_n != 0)
        wx.request({
          url: 'https://white.xmutsec.com/test/tag.php?test3=' + addr_n + '&test4=' + test4,
          /*data: {
            addr_n,
            test4,
          },*/
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data[0] != 'noresult') {
              that.setData({
                re: res.data
              })
            }
            else {
              wx.showToast({
                title: '无结果',
                icon: 'warn',
                duration: 2000
              })
            }
          }
        })
    },

    bindTypeChange: function (e) {
      test4 = e.detail.value
      var that = this
      var type_n = e.detail.value
      this.setData({
        type_n: type_n
      })
      if (type_n != 0)
        wx.request({
          url: 'https://white.xmutsec.com/test/tag.php?test3=' + test3 + '&test4=' + type_n,
          /*data: {
            addr_n,
            test4,
          },*/
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data[0] != 'noresult') {
              that.setData({
                re: res.data
              })
            }
            else {
              wx.showToast({
                title: '无结果',
                icon: 'warn',
                duration: 2000
              })
            }

          }
        })
    },

    onLoad: function () {
      //test1 = 0;
      //test2 = 0;
      //test3 = 0;
      //test4 = 0;
      // 调用函数时，传入new Date()参数，返回值是日期
      var time = formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        time: time
      });
    },

    formSubmit: function (e) {
      var that = this;
      var formData = e.detail.value;
      this.setData({
        keyword: formData,
      })
      wx.request({
        url: 'https://white.xmutsec.com/test/select.php?keyword=' + formData,
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data[0] != 'noresult') {
            that.setData({
              re: res.data
            })
          }
          else {
            wx.showToast({
              title: '无结果',
              icon: 'warn',
              duration: 2000
            })
          }
        }
      })
    },
    add: function () {
      wx.navigateTo({
        url: '../add/add'
      })
    },
    /*
        page1: function () {
          var thing_id = event.currentTarget.dataset.thing_id;
          wx.navigateTo({
            url: '../test/test?thing_id='+item.thing_id
          })
        }*/
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
/*end */