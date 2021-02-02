<template>
  <div class="goods-params" v-if="Object.keys(goodsParams).length !== 0">
    <div class="params-info">
      <table
        v-for="(table, index) in goodsParams.sizes"
        :key="index"
        class="info-table"
      >
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
        </tr>
      </table>
    </div>
    <div class="size-info">
      <table class="size-table">
        <tr v-for="(td, index) in goodsParams.infos" :key="index">
          <td>{{ td.key }}</td>
          <td>{{ td.value }}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsParam",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-params {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f1f1f1;
}

.info-table {
  border-bottom: 5px solid #f1f1f1;
}

.info-table,
.size-table {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
}

.info-table tr,
.size-table tr {
  line-height: 40px;
}

.info-table td,
.size-table td {
  padding: 5px 10px;
  border-bottom: 1px solid #f1f1f1;
}

.info-table td:nth-child(1),
.size-table td:nth-child(1) {
  width: 20%;
}

.size-table td:nth-child(2) {
  color: var(--color-high-text);
  line-height: initial;
}

.info-img img{
  width: 100%;
}
</style>