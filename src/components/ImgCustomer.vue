<template>
  <div>
    <v-btn icon @click="drawer = true">
      <v-img class="show-img" :src="authUser.photoURL"> </v-img>
    </v-btn>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "imgcustomer",
  data() {
    return {
      drawer: false,
      group: null,
      authUser: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user;
    });
  },
};
</script>

<style lang="scss" scoped >
.show-img {
  width: 30px;
  border-radius: 50px;
  padding: 10px;
  border: 1px solid rgb(253, 253, 253);
  margin: 5px;
}
</style>