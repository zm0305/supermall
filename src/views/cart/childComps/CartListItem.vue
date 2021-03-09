<template>
  <div class="cart-list-item">
    <div class="selector-btn">
      <check-button
        :isChecked="product.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="p-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="p-item">
      <div class="p-title">{{ product.name }}</div>
      <div class="p-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="p-price left">￥{{ product.price }}</div>
        <div class="right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  components: {},
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.selector-btn {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-img {
  padding: 5px;
}

.p-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.p-title,
.p-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.p-item {
  position: relative;
  font-size: 16px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}
.p-desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.info-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.p-price {
  color: orangered;
}
</style>