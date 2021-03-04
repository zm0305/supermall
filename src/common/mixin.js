import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
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

//methods函数中的内容不能再抽出来，会被覆盖
export const backTopMixin = {
  data() {
    return {
      backTopIsShow: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backToTop() {
      //第三个参数为毫秒
      //可以通过$refs属性拿到Scroll.vue中的scroll对象，从而操作对应的scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}