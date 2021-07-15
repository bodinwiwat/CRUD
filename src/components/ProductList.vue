<template>
  <v-app class="page">
    <p />
    <v-row>
      <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        color=""
      ></v-text-field>
      <v-spacer />
      <v-select
        v-model="sortBy"
        :items="keys"
        prepend-inner-icon="mdi-magnify"
        label="Sort by"
        class="show-select"
      ></v-select>
      <v-btn icon small depressed :value="false" class="show-btn">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn icon small depressed :value="true" class="show-btn">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <template v-for="(product, i) in products">
        <v-col :key="i">
          <v-card class="show-row">
            <v-img :src="product.image" height="250px"> </v-img>
            <v-card-title class="title back-text">
              <v-row>
                <v-col>
                  <v-row>
                    <h6 class="mt-4 subheading text-left show-text-title">
                      {{ product.title }}
                    </h6>
                  </v-row>
                  <v-row>
                    <p>
                      {{ product.price | currency }}
                    </p>
                    <v-spacer />
                    <v-btn
                      text
                      color="red accent-4"
                      :disabled="!product.inventory"
                      @click="addProductToCart(product)"
                    >
                      Add to cart
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>
      </template> </v-row
    >
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      productsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      productsPerPage: 4,
      sortBy: "titel",
      keys: ["Title", "Price"],
    };
  },
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
<style lang="scss" scoped >
%message-shared {
  text-align: center;
  display: block;
}
$primarly-color : #D50000 ;

.page {
  @extend %message-shared;
  margin-top: 20px;
  background-position-x: 50%;
  width: 80%;
  margin: auto;
}
.show-hader {
  @extend %message-shared;
}
.show-row {
  @extend %message-shared;
  margin-top: 25px;
  width: 250px;
}
.show-btns {
  margin-left: 22.5%;
}
.show-text-title {
  height: 36px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 4px;
  font-size: 14px;
}
.show-select {
  @extend %message-shared;
  width: 100px;
  height: 50px;
}
.show-btn {
  margin-top: 20px;
}
</style>