<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // cartLen() {
    //   return this.$store.getters.cartLength;
    // },
    // ...mapGetters(['cartLength']),
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>