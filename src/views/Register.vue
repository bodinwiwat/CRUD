<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="black" dark>
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="Email"
                    type="email"
                    v-model="email"
                    placeholder="example@email.com"
                    @keyup.enter.prevent="addItem"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    placeholder="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" dark @click.prevent="addItem"
                  >Register
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card-text class="d-flex justify-center mb-6">
              <v-card-actions>
                Do have an account ?
                <v-btn white text @click.prevent="Reg">
                  <span>Login</span>
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      authUser: null,
    };
  },
  methods: {
    addItem() {
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(
                () => {
                    this.$router.replace({ name: "secret" });
                    this.email="" ;
                    this.password="" ;
                    alert("Create User Success !!!!!")
                },
                (error) => {
                    this.errorMessage = error.message;
                    alert("Create User Failed !!!!!")
                }
            )
    },
    Reg() {
      this.$router.replace({ name: "login" });
    },
  },
};
</script>
