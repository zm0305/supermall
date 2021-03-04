<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon chat"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  components: {},
};
</script>

<style scoped>
.bottom-bar {
  height: 50px;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* position: relative;
  bottom: 49px; */

  display: flex;
  text-align: center;
}

.icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.chat {
  background-position: 0 -54px;
}

.shop {
  background-position: 0 -98px;
}

.bar-item {
  display: flex;
  flex: 1;
}

.bar-item > div {
  flex: 1;
}

.text {
  font-size: 12px;
}

.bar-right {
  line-height: 50px;
  font-size: 15px;
}

.addCart {
  background-color: yellow;
}

.buy {
  background-color: pink;
  color: white;
}
</style>