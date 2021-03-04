<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="top">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="images">
      <div class="images-title">{{ detailInfo.detailImage[0].key }}</div>
      <div class="images-list">
        <img
          v-for="(item, index) in detailInfo.detailImage[0].list"
          :key="index"
          :src="item"
          @load="imageLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter: 0,
      imageLength: 0,
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      //解决页面滚动高度的问题
      //1.判断图片是不是最后一张
      // if (++this.counter === this.imageLength) {
      //   this.$emit("imageLoad");
      // }
      //2.利用防抖
      this.$emit("imageLoad");
    },
  },
  watch: {
    //设置watch可以避免this.detailInfo.detailImage[0].list.length会获取多次，这样就只会在获取到detailInfo的时候调用一次
    detailInfo() {
      this.imageLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.top {
  margin: 10px 0;
}

.top .start::before,
.top .end::before {
  content: "";
  width: 5px;
  height: 5px;
  background-color: #333;
  position: absolute;
  bottom: 0;
}
.start {
  float: left;
}
.end {
  float: right;
}
.top .start,
.top .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f1f1f1;
}
.desc {
  font-size: 14px;
  padding: 10px;
}

.images-list img {
  width: 100%;
}
</style>