import shop from "../../api/shop";

const state = {
  products: [],
  cart: [],
  checkoutStatus: null,
};
const getters = {
  availableProducts(state) {
    return state.products.filter((product) => product.inventory > 0);
  },
  cartProducts(state) {
    return state.cart.map((cartItem) => {
      const product = state.products.filter(
        (product) => product.id === cartItem.id
      );
      return {
        id: product[0].id,
        title: product[0].title,
        price: product[0].price,
        image: product[0].image,
        inventory: product[0].inventory,
        quantity: cartItem.quantity,
      };
    });
  },
  
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
  cartTotalQuantity(state, getters) {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  },
};
const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  pushProductToCart(state, productId) {
    state.cart.push({
      id: productId,
      quantity: 1,
    });
  },
  popProductToCart(state, productId) {
    state.cart.push();
  },
  incrementProductInventory(state, product) {
    product.inventory++;
  },
  decrementProductInventory(state, product) {
    product.inventory--;
  },
  incrementItemQuantity(state, cartItem) {
    cartItem.quantity++;
  },
  decrementItemQuantity(state, cartItem) {
    cartItem.quantity--;
  },
  setCartItems(state, { items }) {
    state.items = items;
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
  emptyCart(state) {
    state.cart = [];
  },
};
const actions = {
  fetchProduct({ commit }) {
    try {
      shop.getProducts((products) => {
        commit("setProducts", products);
      });
    } catch (error) {
      console.log(error);
    }
  },
  addProductToCart(context, product) {
    if (product.inventory > 0) {
      const cartItem = context.state.cart.find(
        (item) => item.id === product.id
      );
      if (!cartItem) {
        context.commit("pushProductToCart", product.id);
      } else {
        context.commit("incrementItemQuantity", cartItem);
      }
      context.commit("decrementProductInventory", product);
    }
  },
  addQuantityToCart(context, product) {
    if (product.inventory > 0) {
      const cartItem = context.state.cart.find(
        (item) => item.id === product.id
      );
      if (!cartItem) {
        context.commit("pushProductToCart", product.id);
      } else {
        context.commit("incrementItemQuantity", cartItem);
      }
      context.commit("decrementProductInventory", product);
    }
  },
  popQuantityToCart(context, product) {
    if (product.inventory > 0) {
      const cartItem = context.state.cart.find(
        (item) => item.id === product.id
      );
      if (!cartItem) {
        context.commit("pushProductToCart", product.id);
      } else {
        context.commit("decrementItemQuantity", cartItem);
      }
      context.commit("incrementProductInventory", product);
    }
  },
  checkout({ commit, state }) {
    shop.buyProducts(
      state.cart,
      () => {
        commit("emptyCart");
        commit("setCheckoutStatus", "success");
      },
      () => {
        commit("setCheckoutStatus", "fail");
      }
    );
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
