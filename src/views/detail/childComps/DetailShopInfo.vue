<template>
  <div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-msg">
      <img class="shop-icon" :src="shop.logo" />
      <span class="shop-title">{{ shop.name }}</span>
    </div>
    <div class="shop-info">
      <div class="left-info info-item">
        <div class="info-sell">
          <div class="sell-count">{{ shop.sells | shopSellFilter }}</div>
          <div class="info-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="info-text">全部宝贝</div>
        </div>
      </div>
      <div class="right-info info-item">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td :class="{ 'better-score': item.isBetter }">{{ item.score }}</td>
            <td :class="{ 'better-more': item.isBetter }" class="better">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="shop-enter">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    shopSellFilter(value) {
      return value > 10000 ? (value / 10000).toFixed(1) + "万" : value;
    },
  },
};
</script>

<style scoped>
.shop-icon {
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-shop-info {
  margin: 10px 20px;
}

.shop-title {
  position: relative;
  bottom: 14px;
  left: 10px;
  font-size: 18px;
}

.shop-info {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
}

.left-info {
  display: flex;
  justify-content: space-evenly;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.info-item {
  flex: 1;
}

.info-sell,
.info-goods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.info-text {
  color: #222;
  font-size: 12px;
}

.right-info table {
  margin-left: 30px;
  font-size: 13px;
  line-height: 20px;
  color: #222;
  text-align: left;
}

.right-info table td {
  padding: 5px 2px;
}

.better-score {
  color: red;
}

.better span {
  background-color: #5ea732;
  color: white;
}

.better-more span {
  background-color: red;
}

.detail-bottom {
  text-align: center;
}

.shop-enter {
  display: inline-block;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  background-color: #f2f5f8;
  text-align: center;
  line-height: 30px;
}
</style>