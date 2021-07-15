<template>
  <div class="grid-container">
    <template v-for="(product, i) in products">
      <div :key="i">
        <div class="grid-item">
          <div class="thumbnail">
            <img :src="product.image" class="portrait" />
          </div>
          <div class="container">
            <h4>{{ product.title }}</h4>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },
  created() {
    this.$store.dispatch("fetchProduct");
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },
};
</script>

<style lang="scss" scoped>

.grid-container {
  display: grid;
  grid-gap: 170px 10px;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
  width: 250px;
}
.grid-item {
  padding: 20px;
  font-size: 30px;
  text-align: center;
  width: 250px;
  height: 350px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  text-align: center;
}
div {
  height: 200px;
  img {
    max-width: 100%;
  }
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  height: 200px;
  width: 100%;
  height: inherit;
  padding: 2px 16px;
  text-align: left;
  h4 {
    line-height: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 4px;
    font-size: 14px;
  }
}
.thumbnail {
  position: relative;
  width: 210px;
  height: 210px;
  overflow: hidden;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  img.portrait {
    width: 100%;
    height: auto;
  }
}
</style>