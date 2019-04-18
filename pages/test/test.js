// pages/test.js
var test
Page({
  onLoad: function (options) {
    var thing_id = options.thing_id
    console.log(thing_id)
    test = thing_id
    var that = this;
    var formData = test;
    this.setData
      ({
        thing_id: formData,
      })
    wx.request
      ({
        url: 'https://white.xmutsec.com/test/test.php?thing_id=' + formData,
        data: formData,
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData
            ({
              re: res.data,
            })
          wx.showToast
            ({
              title: 'ok',
              icon: 'success',
              duration: 2000
            })
        }
      })
  },

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  back: function () {
    wx.navigateBack()
    {
      delta: 1;
    }
  },
})