<template>
  <v-app>
    <Product/>
  </v-app>
</template>

<script>
import Product from "./ProductList";
export default {
  name: "HelloWorld",
  components: {
    Product,
  },
};
</script>
