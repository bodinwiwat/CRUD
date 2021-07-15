<template>
  <v-app id="inspire">
    <v-main>
      <div v-if="authUser">
        <v-card max-width="374">
          <v-img :src="authUser.photoURL"> </v-img>
          <v-card-title class="title back-text">
            <v-row class="fill-height flex-column">
              <h5 class="mt-4 subheading text-left">
                {{ authUser.displayName }}
              </h5>
              <div>
                <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                  {{ authUser.email }}
                </p>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
      </div>
      <div v-else>
        <v-app id="inspire" class="show-text">
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                  <v-toolbar color="black" dark>
                    <v-toolbar-title>Login</v-toolbar-title>
                  </v-toolbar>
                  <template>
                    <div class="pa-9">
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
                            <v-btn
                              color="error"
                              block
                              @click.prevent="loginGoogle"
                            >
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
                            <v-btn
                              color="black"
                              dark
                              block
                              @click.prevent="loginApple"
                            >
                              <v-icon>mdi-apple</v-icon>
                              Apple
                            </v-btn>
                          </template>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-card>
                <v-card-text class="d-flex justify-center mb-6">
                  <v-card-actions>
                    Don't have an account ?
                    <v-btn white text @click.prevent="Reg">
                      <span>Register</span>
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-app>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      authUser: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user;
    });
  },
  methods: {
    async Login() {
      try {
        const x = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(x);
        this.$router.replace({ name: "secret" });
      } catch (error) {
        alert("Login User Failed !!!!!");
        console.log(error);
      }
    },
    loginGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          this.$router.replace({ name: "store" });
        })
        .catch((error) => {
          console.log(error);
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
        });
    },
    loginApple() {
      let provider = new firebase.auth.OAuthProvider("apple.com");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;
          let user = result.user;
          let accessToken = credential.accessToken;
          let idToken = credential.idToken;
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
    },
    Reg() {
      this.$router.replace({ name: "register" });
    },
  },
};
</script>
<style lang="scss" scoped >
.show-text {
  text-align: center;
}
</style>