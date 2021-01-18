<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import $ from "jquery";

// variables
let $win = $(window);
let clientWidth = $win.width();
let clientHeight = $win.height();

$(window).resize(function() {
  let newWidth = $win.width();
  let newHeight = $win.height();
  if (newWidth !== clientWidth && newHeight !== clientHeight) {
    location.replace(location);
  }
});

(function($) {
  $.fn.typewriter = function() {
    this.each(function() {
      let $ele = $(this),
        str = $ele.html(),
        progress = 0;
      $ele.html("");
      let timer = setInterval(function() {
        let current = str.substr(progress, 1);
        if (current === "<") {
          progress = str.indexOf(">", progress) + 1;
        } else {
          progress++;
        }
        $ele.html(str.substring(0, progress) + (progress & 1 ? "_" : ""));
        if (progress >= str.length) {
          clearInterval(timer);
        }
      }, 75);
    });
    return this;
  };
  // eslint-disable-next-line no-undef
})($);
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
