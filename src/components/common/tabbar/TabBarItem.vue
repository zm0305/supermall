<template>
  <div class="tabbar-item" @click="btnClick">
    <div v-if="isActive">
      <slot name="slot-img-active"></slot>
    </div>
    <div v-else>
      <slot name="slot-img"></slot>
    </div>
    <div :style="textActive">
      <slot name="slot-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    textActive() {
      return this.isActive ? { color: "#ff5777" } : {};
    },
  },
  methods: {
    btnClick() {
      if (this.$route.path === this.path) return;
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tabbar-item {
  flex: 1;
  font-size: 14px;
}

.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>