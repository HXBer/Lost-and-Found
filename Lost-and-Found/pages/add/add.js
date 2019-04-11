// pages/add/add.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: 
  {
    date:'时间',
    addr_n:0,
    type_n:0,
    addr_array: ['位置', '教学楼', '精工园', '图书馆', '宿舍楼', '其他'],
    type_array: ['类型', '卡', '包', '书', '电子产品','伞', '其他'],
    desc:'',
  },

  back:function()
  {
   wx.navigateBack()
    {
      delta: 1;
    }
  },

  bindDateChange: function (e)
  {
    this.setData
      ({
        date: e.detail.value
      })
  },

  bindAddrChange: function (e) 
  {
    this.setData
      ({
        addr_n: e.detail.value
      })
  },

  bindTypeChange: function (e) 
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



  formSubmit: function (e) {

    //声明当天执行的
    var that = this;

    //获取表单所有name=keyword的值
    var addr_array = ['位置', '教学楼', '精工园', '图书馆', '宿舍楼', '其他'];
    var type_array = ['类型', '卡', '包', '书', '电子产品', '伞', '其他'];
    var desc = e.detail.value.desc;
    var time = e.detail.value.time;
    var type = type_array[e.detail.value.type];
    var addr = addr_array[e.detail.value.addr];
    //显示搜索中的提示
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })

    //向搜索后端服务器发起请求
    wx.request({

      //URL
      url: 'https://white.xmutsec.com/test/insert.php?desc=' + desc +'&time=' + time + '&type=' + type+ '&addr=' + addr ,

      //发送的数据
      //data: desc,time,addr,

      //请求的数据时JSON格式
      header: {
        'Content-Type': 'application/json'
      },

      //请求成功
      success: function (res) {

        //控制台打印（开发调试用）
        console.log(res.data)

        //把所有结果存进一个名为re的数组
        that.setData({
          re: res.data,
        })

        //搜索成功后，隐藏搜索中的提示
        wx.hideLoading();
      }
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

module.exports =
{
  formatTime: formatTime
}