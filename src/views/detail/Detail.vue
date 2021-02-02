<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
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
      <detail-goods-param :goodsParams="goodsParam"></detail-goods-param>
      <detail-comments :commentInfo="commentInfo"></detail-comments>
      <goods-list :goods="recommendList"></goods-list>
    </scroll>
    <back-top v-if="backTopIsShow" @click.native="backToTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailGoodsParam from "./childComps/DetailGoodsParam";
import DetailComments from "./childComps/DetailComments";

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
    BackTop,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailComments,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      backTopIsShow: false,
      commentInfo: {},
      recommendList: [],
    };
  },
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
    });

    getRecommend().then((res) => {
      this.recommendList = res.data.list;
    });
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    contentScroll(position) {
      this.backTopIsShow = position.y < -1000 ? true : false;
    },
    backToTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>