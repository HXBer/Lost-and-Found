var app = getApp()
Page
({
    data: 
    {
      date: '时间',
      array: ['升序', '降序'],
      data_n: 0,
      addr_n: 0,
      type_n:0,
      addr_array:['位置','教学楼','精工园','图书馆','宿舍楼'],
      type_array:['类型','卡','包','书','电子产品','文具','伞','其他'],
      search_result:'',
    },

    bindPickerChange: function (e) 
    {
      this.setData
      ({
       data_n: e.detail.value
      })
    },

    bindDateChange: function (e) 
    {
      this.setData
      ({
        date: e.detail.value
      })
    },

    bindAddrChange: function(e)
    {
      this.setData
      ({
        addr_n: e.detail.value
      })
    },

    bindTypeChange:function(e)
    {
      this.setData
        ({
          type_n: e.detail.value
        })
    },

    onLoad: function () 
    {
      // 调用函数时，传入new Date()参数，返回值是日期
      var time = formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData
      ({
        time: time
      });
    },

    formSubmit: function (e) 
    {
      var that = this;
      var formData = parseInt(e.detail.value);
      this.setData
        ({
          keyword: formData,
        })
      wx.request({
        url: 'http://white.xmutsec.com/test/fuck.php?keyword=' + formData,
        data: formData,
        header: { 'Content-Type': 'application/json' },
        success: function (res) 
        {
          console.log(res.data)
          that.setData
          ({
            re: res.data,
          })
          wx.showToast
          ({
            title: '已提交',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    add: function () 
    {
      wx.navigateTo
      ({
        url: '../add/add'
      })
    },

})


/*获取当前日期*/
function formatTime(date) 
{
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) 
{
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = 
{
  formatTime: formatTime
}
/*end */
