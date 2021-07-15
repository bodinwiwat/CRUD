<template>
  <div>
    <router-link to="/cart" tag="i">
      <v-btn icon>
      <v-icon>mdi-cart-variant</v-icon>
      <div v-if="quantityTotal != 0" >
          <div class="pa-2 secondary rounded-circle show-circle red accent-3"></div>
      <div class="show-text">
        <h5 v-if="quantityTotal <= 9">{{ quantityTotal }}</h5>
        <h6 v-else class="show-text2">...</h6>
      </div>
      </div>
    </v-btn>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "cartProducts",
      catrTotal: "cartTotalPrice",
      quantityTotal: "cartTotalQuantity",
    }),
  },
};
</script>
<style lang="scss" scoped >
.show-icon {
margin-left:0px;
  position: fixed;
}
.show-circle {
  margin-top: -23px;
  margin-left:0px;
  position: fixed;
}
.show-text {
  margin-top: -22px;
  margin-left: 2px;
  position: fixed;
}
.show-text2 {
  margin-left: -1px;
}
</style>