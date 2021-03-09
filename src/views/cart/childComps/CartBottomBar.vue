<template>
  <div class="cart-bottom-bar">
    <div class="check-left">
      <check-button
        :isChecked="isSelectAll"
        @click.native="checkBtnClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        }).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      //   return !(this.cartList.filter((item) => !item.checked).length);
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkBtnClick() {
      if (this.isSelectAll) {
        this.cartList.map((item) => (item.checked = false));
      } else {
        this.cartList.map((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
}

.check-left {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.check-left span {
  padding: 0 5px;
}

.total-price {
  line-height: 40px;
}

.calculate {
  height: 40px;
  width: 100px;
  background-color: orangered;
  color: white;
  line-height: 40px;
  text-align: center;
  position: absolute;
  right: 0;
}
</style>