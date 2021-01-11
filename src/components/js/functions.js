/*
 * http://love.hackerzhou.me
 */
import $ from 'jquery'

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
  var newWidth = $win.width();
  var newHeight = $win.height();
  if (newWidth != clientWidth && newHeight != clientHeight) {
    location.replace(location);
  }
});

(function ($) {
  $.fn.typewriter = function () {
    this.each(function () {
      var $ele = $(this), str = $ele.html(), progress = 0;
      $ele.html('');
      var timer = setInterval(function () {
        var current = str.substr(progress, 1);
        if (current == '<') {
          progress = str.indexOf('>', progress) + 1;
        } else {
          progress++;
        }
        $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
        if (progress >= str.length) {
          clearInterval(timer);
        }
      }, 75);
    });
    return this;
  };
// eslint-disable-next-line no-undef
})(jQuery);

export function timeElapse(startDate) {
  $.ajax({
    url: '',
    type: 'get',
    success: function (data, status, xhr) {
      var str = xhr.getResponseHeader('Date');  //获取Response Header里面的Date
      var date = new Date(str).getTime(); //把Date转换成时间对象
      var current = new Date(date);
      var sdate = new Date(startDate);
      var totalSeconds = ((current.getTime() - sdate.getTime()) / 1000);
      // eslint-disable-next-line no-console
      console.log(current.getTime(), sdate.getTime())
      var days = parseInt(parseInt(totalSeconds) / 86400);

      //小时
      var lessThanADay = parseInt(parseInt(totalSeconds) % 86400);
      var hours = parseInt(lessThanADay / (3600));
      if (hours < 10) {
        hours = "0" + hours;
      }

      //分钟
      var minutes = Math.floor((lessThanADay - hours * 3600) / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      //秒
      var seconds = parseInt(lessThanADay % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒";
      $("#clock").html(result);
    }
  });
}
