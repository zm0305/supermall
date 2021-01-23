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
    });
    this.scroll.on("pullingUp", () => {
      this.scroll.refresh();
    });
  },
};
</script>

<style scoped>
</style>