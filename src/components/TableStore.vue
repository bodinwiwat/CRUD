<template>
  <v-container fluid>
    <v-data-iterator
      :items="products"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-row>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            color="red accent-4"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
              class="show-select"
            ></v-select>
            <v-btn-toggle v-model="sortDesc">
              <v-btn :value="false" class="show-btn">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn :value="true" class="show-btn">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-row>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.title"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="show-row">
              <v-img :src="item.image" height="250px"> </v-img>
              <v-card-title class="title back-text">
                <v-row>
                  <v-col>
                    <v-row>
                      <h6 class="mt-4 subheading text-left show-text-title">
                        {{ item.title }}
                      </h6>
                    </v-row>
                    <v-row>
                      <p>
                        {{ item.price | currency }}
                      </p>
                      <v-spacer />
                      <v-btn
                        text
                        color="red accent-4"
                        :disabled="!item.inventory"
                        @click="addProductToCart(item)"
                      >
                        Add to cart
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12, 20],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Title", "Price"],
      items: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    products() {
      return this.$store.getters.availableProducts;
    },
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },
};
</script>
<style lang="scss" scoped >
.page {
  margin-top: 20px;
  background-position-x: 50%;
  width: 80%;
  display: block;
  margin: auto;
}
.show-hader {
  text-align: center;
}
.show-row {
  text-align: center;
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
  width: 100px;
  height: 50px;
  display: block;
}
.show-btn {
  margin-top: 20px;
}
</style>