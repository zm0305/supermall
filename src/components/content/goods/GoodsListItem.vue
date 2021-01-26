<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
  },
};
</script>

<style scoped>
.goods-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}

.goods-info .price {
  color: var(--color-high-text);
}

.goods-info .collect {
  position: relative;
  margin-left: 20px;
}

.goods-info .collect::before {
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  width: 14px;
  height: 14px;
  position: absolute;
  content: "";
  left: -15px;
  top: -1px;
}

.goods-info p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>