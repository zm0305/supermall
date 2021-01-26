<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullngUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 组件无法直接监听@click点击事件 -->
    <back-top @click.native="backClick" v-show="backTopIsShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      backTopIsShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //第三个参数为毫秒
      //可以通过$refs属性拿到Scroll.vue中的scroll对象，从而操作对应的scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //1.判断backTop是否显示
      this.backTopIsShow = -position.y > 1000 ? true : false;
      //2、判断TabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop ? true : false;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //2.获取tabControl的offsetTop，需要等轮播图加载完后再获取高度才是正确的，因此不适合放在mounted中
      //所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        if (res && res.data && res.data.list) {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;
        }
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  padding-bottom: 49px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100%);
  overflow: hidden;
} */
</style>