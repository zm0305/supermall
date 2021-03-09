<template>
  <div class="check-button" :class="{ check: isChecked }" @click="clickItem">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  components: {},
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    clickItem() {
      this.$emit("checkBtnClick");
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
  width: 18px;
  height: 18px;
}

.check {
  background-color: red;
  border-color: red;
}
</style>