<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll
      class="scroll-content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-goods-param
        :goodsParams="goodsParam"
        ref="params"
      ></detail-goods-param>
      <detail-comments
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comments>
      <goods-list :goods="recommendList" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top v-if="backTopIsShow" @click.native="backToTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailGoodsParam from "./childComps/DetailGoodsParam";
import DetailComments from "./childComps/DetailComments";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { itemListenerMinxin, backTopMinxin } from "common/mixin";
import { debounce } from "common/utils";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    NavBar,
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailComments,
    DetailBottomBar,
  },
  mixins: [itemListenerMinxin, backTopMinxin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendList: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  mounted() {},
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log(res);

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      this.commentInfo = data.rate;

      /*
       *虽然运行到此处时页面已经获取到了数据，但是还需要渲染，此时直接获取offsetTop是不准确的，
       *因此可以将这部分操作放到this.$nextTick中
       */
      // this.$nextTick(() => {
      //   //根据最新的数据，对应的dom已经被渲染出来，但是图片没有加载完，此时的offsetTop不包含图片的高度
      //   this.themeTopY = [];
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      //   console.log(this.themeTopY);
      // });
    });

    getRecommend().then((res) => {
      this.recommendList = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      console.log(this.themeTopY);
    });
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    imageLoad() {
      //解决页面滚动高度的问题
      //1.判断图片是不是最后一张，然后就直接调用refresh方法
      // this.$refs.scroll.refresh();
      //2.利用mixin中定义在data中的newRefresh
      this.newRefresh();
      //在图片加载完成时获取高度
      this.getThemeTopY();
    },
    contentScroll(position) {
      const positionY = -position.y;
      this.backTopIsShow = positionY > 1000 ? true : false;
      for (let i = 0; i < this.themeTopY.length; i++) {
        if (this.currentIndex !== i) {
          if (
            positionY >= this.themeTopY[i] &&
            i == this.themeTopY.length - 1
          ) {
            this.currentIndex = i;
            console.log(this.themeTopY.length - 1);
            this.$refs.nav.currentIndex = this.currentIndex;
            return;
          }
          if (
            positionY >= this.themeTopY[i] &&
            positionY < this.themeTopY[i + 1]
          ) {
            this.currentIndex = i;
            console.log(i);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      }
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
    },
  },
  //detail组件没有做缓存，因此在离开时会调用destory函数
  destroyed() {
    this.$bus.$off("itemImageLoad", this.refreshListener);
  },
};
</script>

<style scoped>
.detail {
  background-color: #fff;
  position: relative;
  z-index: 9;
  height: 100vh;
}

.scroll-content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
