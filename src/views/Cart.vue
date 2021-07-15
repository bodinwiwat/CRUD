<template>
  <v-app>
      <ShoppingCart/>
  </v-app>
</template>

<script>
import ShoppingCart from "../components/ShoppingCart.vue";
export default {name: "cart",
  components: {
    ShoppingCart,
  },
  
}
</script>

<style>

</style>