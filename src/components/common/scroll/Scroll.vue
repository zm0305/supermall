<template>
  <!-- ref一般绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      scroll: {},
    };
  },
  mounted() {
    // document.querySelector()获取到的值不准确，因为可能有多个同名class，因此可以使用$refs
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // taps: true,
      pullUpLoad: true,
      probeType: this.probeType,
    });
    this.scroll.on("pullingUp", () => {
      this.scroll.refresh();
    });
    //监听滚动区域
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>