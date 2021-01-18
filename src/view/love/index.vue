<template>
  <div>
    <audio
      src="@/assets/music/CanonP.mp3"
      autoplay="autoplay"
      preload="auto"
      loop=""
      id="audio"
      ref="audio"
      con
    ></audio>
    <div id="wrap">
      <div id="text">
        <div id="code">
          <span class="say">贺方荣，我会牵着你的手，走到满头白发的那一天，</span
          ><br />
          <span class="say">我会守护你生命里的精彩，并陪伴你一路精彩下去。</span
          ><br />
          <span class="say">你的幸福快乐，是我一生的追求。</span><br />
          <span class="say">我会每一天带着笑脸，和你说早安，</span><br />
          <span class="say">我会每一晚与你道声晚安再入梦乡，</span><br />
          <span class="say">我会带你去所有你想去的地方，</span><br />
          <span class="say">陪你闹看你笑</span><br />
          <span class="say">历经你生命中所有的点点滴滴。</span><br />
          <span class="say">我期待这一生与你一起走过，</span><br />
          <span class="say">我期待与你慢慢变老</span><br />
          <span class="say">等我们老到哪儿也去不了，</span><br />
          <span class="say">还能满载着一生的幸福快乐 ！</span><br />
          <br />
          <span class="say">我会为我们的未来撑起一片天空，</span><br />
          <span class="say">为我们的将来担负起一生的责任，</span><br />
          <span class="say">愿意为你去做每一件能让你开心快乐的事。</span><br />
          <span class="say">所有我们经历的点点滴滴，</span><br />
          <span class="say">都是我们一辈子最美的回忆。</span><br />
          <span class="say">我愿意爱你直到老去！</span><br />

          <span class="say"><span class="space"></span> -- Yours, 亚轩</span>
        </div>
      </div>
      <div id="clock-box">
        李亚轩 与 贺方荣 在一起的
        <div id="clock"></div>
      </div>
      <canvas id="canvas" width="1100" height="680"></canvas>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { Tree } from "@/components/js/love";
import { sleep, timeElapse } from "@/utils/tools";
/*global $await*/

export default {
  name: "index",
  data() {
    return {
      year: 2018,
      month: 2,
      day: 13,
      hour: 0,
      minute: 45,
      second: 0,
      music: "@/assets/music/CanonP.mp3",
      hold: 1,
      foot: {}
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      let canvas = $("#canvas");
      let audio = this.$refs["audio"];
      if (!canvas[0].getContext) {
        $("#error").show();
        return false;
      }

      let width = canvas.width();
      let height = canvas.height();

      canvas.attr("width", width);
      canvas.attr("height", height);
      let opts = {
        seed: {
          x: width / 2 - 20,
          color: "rgb(190, 26, 37)",
          scale: 2
        },
        branch: [
          [
            535,
            680,
            570,
            250,
            500,
            200,
            30,
            100,
            [
              [
                540,
                500,
                455,
                417,
                340,
                400,
                13,
                100,
                [[450, 435, 434, 430, 394, 395, 2, 40]]
              ],
              [
                550,
                445,
                600,
                356,
                680,
                345,
                12,
                100,
                [[578, 400, 648, 409, 661, 426, 3, 80]]
              ],
              [539, 281, 537, 248, 534, 217, 3, 40],
              [
                546,
                397,
                413,
                247,
                328,
                244,
                9,
                80,
                [
                  [427, 286, 383, 253, 371, 205, 2, 40],
                  [498, 345, 435, 315, 395, 330, 4, 60]
                ]
              ],
              [
                546,
                357,
                608,
                252,
                678,
                221,
                6,
                100,
                [[590, 293, 646, 277, 648, 271, 2, 80]]
              ]
            ]
          ]
        ],
        bloom: {
          num: 700,
          width: 1080,
          height: 650
        },
        footer: {
          width: 1200,
          height: 5,
          speed: 10
        }
      };
      let tree = new Tree(canvas[0], width, height, opts);
      let seed = tree.seed;
      this.foot = tree.footer;

      canvas
        .click(e => {
          if (this.$refs.audio.paused) {
            this.$refs.audio.play();
          }
          let offset = canvas.offset(),
            x,
            y;
          x = e.pageX - offset.left;
          y = e.pageY - offset.top;
          if (seed.hover(x, y)) {
            this.hold = 0;
            canvas.unbind("click");
            canvas.unbind("mousemove");
            canvas.removeClass("hand");
          }
        })
        .mousemove(e => {
          let offset = canvas.offset(),
            x,
            y;
          x = e.pageX - offset.left;
          y = e.pageY - offset.top;
          canvas.toggleClass("hand", seed.hover(x, y));
        });

      let runAsync = async () => {
        await this.seedAnimate(seed);
        await this.growAnimate(tree);
        await this.flowAnimate(tree);
        await this.moveAnimate(tree, canvas);
        this.textAnimate();
        await this.jumpAnimate(tree, width, height);
      };

      runAsync();
    },
    async seedAnimate(seed) {
      seed.draw();
      while (this.hold) {
        await sleep(10);
      }
      while (seed.canScale()) {
        seed.scale(0.95);
        await sleep(10);
      }
      while (seed.canMove()) {
        seed.move(0, 2);
        this.foot.draw();
        await sleep(10);
      }
    },
    async growAnimate(tree) {
      do {
        tree.grow();
        await sleep(10);
      } while (tree.canGrow());
    },
    async flowAnimate(tree) {
      do {
        tree.flower(2);
        await sleep(10);
      } while (tree.canFlower());
    },
    async moveAnimate(tree, canvas) {
      tree.snapshot("p1", 240, 0, 610, 680);
      while (tree.move("p1", 500, 0)) {
        this.foot.draw();
        await sleep(10);
      }
      this.foot.draw();
      tree.snapshot("p2", 500, 0, 610, 680);

      // 会有闪烁不得意这样做
      canvas
        .parent()
        .css("background", "url(" + tree.toDataURL("image/png") + ")");
      canvas.css("background", "#ffe");
      await sleep(300);
      canvas.css("background", "none");
    },
    async jumpAnimate(tree, width, height) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        tree.ctx.clearRect(0, 0, width, height);
        tree.jump();
        this.foot.draw();
        await sleep(20);
      }
    },
    async textAnimate() {
      let together = new Date();
      together.setFullYear(this.year, this.month - 1, this.day);
      together.setHours(this.hour);
      together.setMinutes(this.minute);
      together.setSeconds(this.second);

      $("#code")
        .show()
        .typewriter();
      $("#clock-box").fadeIn(500);
      setTimeout(() => {
        timeElapse(together);
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
