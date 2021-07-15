<template>
  <div class="page">
    <div v-if="authUser">
      <v-card class="show-hader"> Cart </v-card>
      <div>
        <v-row>
          <v-col class="show-col-card">
            <template v-for="(product, i) in products">
              <v-row :key="i">
                <v-col>
                  <v-card class="" v-if="product.quantity != 0" width="600">
                    <v-row>
                      <v-col>
                        <v-img :src="product.image" width="50" height="50px" />
                      </v-col>
                      <v-col>
                        {{ product.title }}
                        {{ product.price | currency }}
                      </v-col>
                      <v-col></v-col>
                      <v-col>
                        <v-row class="show-card-button">
                          <v-btn
                            fab
                            dark
                            small
                            color="error"
                            @click="addQuantityToCart(product)"
                            v-if="product.quantity != 0"
                            >+</v-btn
                          >
                          <v-btn fab dark small v-if="product.quantity != 0">{{
                            product.quantity
                          }}</v-btn>
                          <v-btn
                            fab
                            dark
                            small
                            color="error"
                            @click="popQuantityToCart(product)"
                            v-if="product.quantity != 0"
                            >-</v-btn
                          >
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                  <p />
                </v-col>
              </v-row>
            </template>
          </v-col>
          <v-col>
            <p />
            <v-card class="show-v-card-total">
              <h3>Order Summary</h3>
              <p>
                Subtotal ({{ quantityTotal }} items) {{ catrTotal | currency }}
              </p>
              <v-btn class="show-btn-total" @click="checkout()">
                PROCEED TO CHECKOUT
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <v-card class="show-hader"> Cart </v-card>
      <div>
        <v-row>
          <v-col class="show-col-card">
            <template v-for="(product, i) in products">
              <v-row :key="i">
                <v-col>
                  <v-card v-if="product.quantity != 0" width="600">
                    <v-row>
                      <v-col>
                        <v-img
                          class="show-image"
                          :src="product.image"
                          width="50"
                          height="50px"
                        />
                      </v-col>
                      <v-col>
                        {{ product.title }}
                        {{ product.price | currency }}
                      </v-col>
                      <v-col></v-col>
                      <v-col>
                        <v-row class="show-card-button">
                          <v-btn
                            fab
                            dark
                            small
                            color="error"
                            @click="addQuantityToCart(product)"
                            v-if="product.quantity != 0"
                            >+</v-btn
                          >
                          <v-btn fab dark small v-if="product.quantity != 0">{{
                            product.quantity
                          }}</v-btn>
                          <v-btn
                            fab
                            dark
                            small
                            color="error"
                            @click="popQuantityToCart(product)"
                            v-if="product.quantity != 0"
                            >-</v-btn
                          >
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                  <p />
                </v-col>
              </v-row>
            </template>
          </v-col>
          <v-col>
            <p />
            <v-card class="show-v-card-total">
              <template>
                <div class="pa-9">
                  <v-toolbar color="black" dark>
                    <v-toolbar-title>Login</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        name="email"
                        label="Email"
                        type="text"
                        v-model="email"
                        placeholder="example@email.com"
                        @keyup.enter.prevent="Login"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        name="password"
                        label="Password"
                        v-model="password"
                        type="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <template>
                    <v-btn color="black" dark block @click.prevent="Login">
                      Login
                    </v-btn>
                  </template>
                  <v-divider></v-divider>
                  <p />
                  <p>LOGIN WITH</p>
                  <v-row>
                    <v-col>
                      <template>
                        <v-btn color="error" block @click.prevent="loginGG">
                          <v-icon>mdi-google</v-icon>
                          Google
                        </v-btn>
                      </template>
                    </v-col>
                    <v-col>
                      <template>
                        <v-btn
                          color="blue darken-4"
                          dark
                          block
                          @click.prevent="loginFacbook"
                        >
                          <v-icon>mdi-facebook</v-icon>
                          facebook
                        </v-btn>
                      </template>
                    </v-col>
                    <v-col>
                      <template>
                        <v-btn color="black" dark block @click.prevent="">
                          <v-icon>mdi-apple</v-icon>
                          Apple
                        </v-btn>
                      </template>
                    </v-col>
                  </v-row>
                  <v-row
                    ><v-col>
                      Don't have an account ?
                      <v-btn white text @click.prevent="Reg"> Register </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import Login from "../views/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      email: "",
      password: "",
      authUser: null,
    };
  },
  computed: {
    ...mapGetters({
      products: "cartProducts",
      catrTotal: "cartTotalPrice",
      quantityTotal: "cartTotalQuantity",
    }),
  },
  methods: {
    ...mapActions(["addQuantityToCart", "checkout", "popQuantityToCart"]),
    async Login() {
      try {
        const x = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(x);
        this.$router.replace({ name: "cart" });
      } catch (error) {
        alert("Login User Failed !!!!!");
        console.log(error);
      }
    },
    loginGG() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token);
          console.log(user);
          this.$router.replace({ name: "cart" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginFacbook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;
            let token = credential.accessToken;
          }
          let user = result.user;
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
          // ...
        });
    },
    Reg() {
      this.$router.replace({ name: "register" });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user;
    });
  },
};
</script>
<style lang="scss" scoped >
.show-row-total {
  margin-left: 3%;
}
.show-card-button {
  margin-top: 5px;
  margin-right: 10px ;
  display: block;
}
.page {
  margin-top: 20px;
  margin-left: 10%;
  background-position-x: 50%;
  width: 80%;
  display: block;
}
.showhader {
  text-align: center;
}
.show-row {
  text-align: center;
  margin-top: 35px;
  width: 350px;
  height: 60px;
}
.show-btns {
  margin-left: 22.5%;
}
.show-col-card {
  margin-top: 30px;
  height: auto !important;

// position:fixed;

}
.show-v-card {
  text-align: center;
}
.show-v-card-total {
  text-align: center;
}
.show-btn-total {
  margin-top: -10px;
}
.show-v-card-login {
  margin-top: 25px;
  text-align: center;
  width: 500px;
}
.show-image {
  margin-left: 10px;
}
</style>