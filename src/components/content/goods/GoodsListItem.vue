<template>
  <div class="goods-item">
    <img :src="showImage" alt="" @load="imageLoad" @click="itemClick" />
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
  computed: {
    showImage() {
      return (
        (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.image
      );
    },
  },
  methods: {
    imageLoad() {
      /**
       * 因为首页和详情页都使用了此组件，在详情页页面加载完成时是不需要事件总线发送到Home组件去刷新滑动组件的高度的，
       * 因此需要在Home.vue中做对应处理，接Home.vue Line84
       */
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
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