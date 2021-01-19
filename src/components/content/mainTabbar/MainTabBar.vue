<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <div slot="slot-text">首页</div>
        <img slot="slot-img" src="~assets/img/tabbar/home.svg" />
        <img slot="slot-img-active" src="~assets/img/tabbar/home_active.svg" />
      </tab-bar-item>
      <tab-bar-item path="/category">
        <div slot="slot-text">分类</div>
        <img slot="slot-img" src="~assets/img/tabbar/category.svg" />
        <img
          slot="slot-img-active"
          src="~assets/img/tabbar/category_active.svg"
        />
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <div slot="slot-text">购物车</div>
        <img slot="slot-img" src="~assets/img/tabbar/cart.svg" />
        <img slot="slot-img-active" src="~assets/img/tabbar/cart_active.svg" />
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <div slot="slot-text">我的</div>
        <img slot="slot-img" src="~assets/img/tabbar/profile.svg" />
        <img
          slot="slot-img-active"
          src="~assets/img/tabbar/profile_active.svg"
        />
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>