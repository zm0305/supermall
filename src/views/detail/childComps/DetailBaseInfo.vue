<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="into-title">{{ goods.title }}</div>
    <div class="info-price">
      <div class="new-price">{{ goods.newPrice }}</div>
      <div class="old-price">{{ goods.oldPrice }}</div>
      <div class="discount">{{ goods.discount }}</div>
    </div>
    <div class="info">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="service">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
    },
  },
  components: {},
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 10px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.into-title {
  color: #222;
  font-size: 18px;
}
.info-price {
  display: flex;
  margin-top: 10px;
}

.info {
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-bottom: 5px;
  justify-content: space-between;
}

.service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
}
.service {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
  color: #333;
}

.new-price {
  color: var(--color-high-text);
  font-size: 30px;
}

.old-price {
  text-decoration: line-through;
  margin-top: 13px;
  margin-left: 5px;
}

.discount {
  margin-top: 13px;
  margin-left: 5px;
  background-color: var(--color-high-text);
  color: white;
  border-radius: 8px;
  padding: 3px 5px;
  font-size: 12px;
  position: relative;
  bottom: 5px;
}
</style>