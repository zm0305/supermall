import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types"

export default {
    //mutations唯一的目的就是为了修改state中的状态，有逻辑处理的建议放在actions中
    // addCart(state, payload) {
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);
    //   if (oldProduct) {
    //     oldProduct.count += 1;
    //   } else {
    //     payload.count = 1;
    //     state.cartList.push(payload)
    //   }
    // }
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload);
    }
}