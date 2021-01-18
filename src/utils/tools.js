import $ from "jquery";

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function timeElapse(startDate) {
  $.ajax({
    url: "",
    type: "get",
    success: function(data, status, xhr) {
      let str = xhr.getResponseHeader("Date"); //获取Response Header里面的Date
      let date = new Date(str).getTime(); //把Date转换成时间对象
      let current = new Date(date);
      let sdate = new Date(startDate);
      let totalSeconds = (current.getTime() - sdate.getTime()) / 1000;
      // eslint-disable-next-line no-console
      let days = parseInt(totalSeconds) / 86400;

      //小时
      let lessThanADay = parseInt(totalSeconds) % 86400;
      let hours = parseInt(lessThanADay) / 3600;
      if (hours < 10) {
        hours = "0" + hours;
      }

      //分钟
      let minutes = Math.floor(
        (parseInt(lessThanADay) - parseInt(hours) * 3600) / 60
      );
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      //秒
      let seconds = parseInt(lessThanADay) % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let result =
        '第 <span class="digit">' +
          Math.round(days) +
        '</span> 天 <span class="digit">' +
          Math.round(hours) +
        '</span> 小时 <span class="digit">' +
          Math.round(minutes) +
        '</span> 分钟 <span class="digit">' +
          Math.round(seconds) +
        "</span> 秒";
      $("#clock").html(result);
    }
  });
}
