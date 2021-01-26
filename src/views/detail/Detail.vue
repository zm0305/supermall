<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages;
      console.log(res);
    });
  },
};
</script>

<style scoped>
</style>