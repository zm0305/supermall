import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./mutations"

Vue.use(Vuex)

const state = {
  cartList: []
}
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store;