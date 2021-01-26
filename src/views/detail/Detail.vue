<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import DetailNavBar from "./childComps/DetailNavBar";
export default {
  name: "Detail",
  components: {
    NavBar,
    DetailNavBar,
  },
  data() {
    return {
      iid: null,
    };
  },
  activated() {
    this.iid = this.$route.params.iid;
  },
};
</script>

<style scoped>
</style>