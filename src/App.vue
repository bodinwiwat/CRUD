<template>
  <v-app>
    <div v-if="authUser">
      <v-toolbar color="black" dark>
        <router-link tag="i" to="/store" >
          <v-btn color="black">
            <h1>Store</h1>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <CartIcon />
        <v-btn icon @click="drawer = true">
          <v-img class="show-img" :src="authUser.photoURL"> </v-img>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer class="mx-auto" width="256" v-model="drawer" absolute temporary right>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="black--text text--accent-4"
          >
            <v-list-item two-line>
              <v-list-item-avatar>
                <img :src="authUser.photoURL" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  authUser.displayName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  authUser.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
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
        <template >
          <div class="pa-2">
            <v-btn color="error" block @click.prevent="logout" > Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
    <div v-else>
      <v-toolbar color="black" dark>
        <router-link tag="i" to="/store" >
          <v-btn color="black">
            <h1>Store</h1>
          </v-btn>
        </router-link>
        <v-spacer/>
        <CartIcon />
        <div class="hidden-sm-and-down">
          <router-link
            v-for="item in menuElse"
            :key="item.icon"
            :to="item.path"
            tag="i"
          >
            <v-btn text>{{ item.title }}</v-btn>
          </router-link>
        </div>
        <div class="hidden-md-and-up">
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in menuElse"
                :key="item.icon"
                :to="item.path"
                @click="() => {}"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-toolbar>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import firebase from "firebase";
import CartIcon from "./components/CartIcon.vue";
export default {
  name: "App",
  components: {
    CartIcon,
  },
  data: () => ({
    drawer: false,
    group: null,
    authUser: null,
    menuElse: [
      { icon: "Login", title: "Login", path: "/login" },
      { icon: "Register", title: "Register", path: "/register" },
    ],
  }),
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
          alert("Logout Success !!!!!");
          this.$router.replace({ name: "login" });
        });
    },
  },
};
</script>
<style lang="scss" scoped >
.show-text-logout {
  text-align: center;
}
.show-img {
  width: 30px;
  border-radius: 50px;
  padding: 10px;
  border: 1px solid rgb(253, 253, 253);
  margin: 5px;
}
</style>
