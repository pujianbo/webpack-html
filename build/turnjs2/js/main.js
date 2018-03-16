/**
 * Created by ChengYa on 2016/6/18.
 */

//判断手机类型
window.onload = function() {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
  } else if (u.indexOf('iPhone') > -1) { //苹果手机
    //屏蔽ios下上下弹性
    $(window).on('scroll.elasticity', function(e) {
      e.preventDefault();
    }).on('touchmove.elasticity', function(e) {
      e.preventDefault();
    });
  } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
  }
  //预加载
  loading();
}
//加载页面
function loading() {
  //配置turn.js
  function loadApp() {
    var w = $(window).width();
    var h = $(window).height();
    $('.flipboox').width(w).height(h);
    $(window).resize(function() {
      w = $(window).width();
      h = $(window).height();
      $('.flipboox').width(w).height(h);
    });
    $('.flipbook').turn({
      width: w,
      height: h,
      elevation: 50,
      display: 'single',
      gradients: true,
      autoCenter: true,
      when: {
        turning: function(e, page, view) {
          if (page == 1) {
            $(".pagebox").css("display", "none");
          } else {
            $(".pagebox").css("display", "block");
          }
        },
        turned: function(e, page, view) {
          console.log(page);
          var total = $(".flipbook").turn("pages"); //总页数
          if (page == 1) {
            $(".return").css("display", "none");
            $(".btnImg").css("display", "none");
          } else {
            $(".return").css("display", "block");
            $(".btnImg").css("display", "block");
          }
        }
      }
    })
  }
  yepnope({
    test: Modernizr.csstransforms,
    yep: ['js/turn.js'],
    complete: loadApp
  });
}
