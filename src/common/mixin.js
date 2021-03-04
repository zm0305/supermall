import { debounce } from "./utils";
export const itemListenerMinxin = {
  data() {
    return {
      refreshListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.refreshListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.refreshListener);
  }
}