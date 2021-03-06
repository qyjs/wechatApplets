//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    films: [{}, {}, {}]
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../list/list'
  //   })
  // },
  toView: function (e) {
    var temp = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../list/list?type=' + temp.type
    })
  },
  detail: function (e) {
    var data = e.currentTarget.dataset;//获取当前组件上由data-开头的自定义属性组成的集合
    wx.navigateTo({
      url: '../movie/movie?id=' + data.id + '&title=' + data.title
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '全力加载中...',
    })
    var that = this;

    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

    // wx.navigateTo({
    //   url: '../list/list?type=coming_soon'
    // })
    var typelist = ["in_theaters", "coming_soon", "top250"];
    var titlelist = ["正在热映", "即将上映", "TOP250电影"];
    for (let i = 0; i < typelist.length; i++) {
      var type = typelist[i];
      app.getFilminfo(type, 0, 8, function (res) {
        wx.hideLoading();
        var data = res.data;
        data.subjects.map(function (item) {
          if (item.title.length > 8) {
            item.title = item.title.slice(0, 7) + "...";
          }
          if (item.rating.average >= 9.5) {
            item.rating.star = "star10";
          } else {
            item.rating.star = "star" + Math.round(item.rating.average);
          }
        })
        that.data.films[i] = { title: titlelist[i], data: data.subjects, type: typelist[i] };
        that.setData({
          films: that.data.films
        });
      })
    }

  }
})