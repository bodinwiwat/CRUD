<template>
  <v-container fluid>
    <ProductList />
    <!-- <TableStoreScss/> -->
    <TableStore/>
  </v-container>
</template>
<script>
import firebase from "firebase";
import ProductList from "../components/ProductList.vue";
import TableStore from "../components/TableStore.vue";
import TableStoreScss from "../components/TableStoreScss.vue";
export default {
  name: "secret",
  components: {
    ProductList,
    TableStore,
    TableStoreScss,
  },
  data() {
    return {
      authUser: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user;
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Login Success !!!!!");
          this.$router.replace({ name: "login" });
        });
    },
  },
};
</script>
