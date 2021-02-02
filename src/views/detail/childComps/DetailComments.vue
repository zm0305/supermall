<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-title">用户评价</div>
      <div class="comment-more">更多</div>
    </div>
    <div
      class="comment-info"
      v-for="(item, index) in commentInfo.list"
      :key="index"
    >
      <div class="user-info">
        <img :src="item.user.avatar" alt="" />
        <span class="user-name">{{ item.user.uname }}</span>
      </div>
      <p class="font14">{{ item.content }}</p>
      <div class="goods-info">
        <span class="font14">{{ item.created | dateFormat }}</span>
        <span class="font14">{{ item.style }}</span>
      </div>

      <div class="goods-images" v-if="item.images && item.images.length > 0">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in item.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailComments",
  props: {
    commentInfo: {
      type: Object,
    },
  },
  filters: {
    dateFormat(date) {
      // var time = new Date(date * 1000);
      // var year = time.getFullYear();
      // var month = time.getMonth() + 1;
      // var date = time.getDate();
      // return [year, month, date].join("/");
      return formatDate(new Date(date * 1000), "yyyy/MM/dd");
    },
  },
};
</script>

<style scoped>
.comment {
  padding: 20px 15px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
}

.user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  position: relative;
  bottom: 18px;
  left: 5px;
}

.user-info {
  padding: 10px 0;
}

.goods-info {
  color: #777;
  padding: 15px 0;
}

.goods-info span:nth-child(2) {
  margin-left: 10px;
}

.goods-images img {
  width: 10vh;
}
</style>