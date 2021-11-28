   
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="brand">
        <img
          src="https://cdn.vn.garenanow.com/web/lol-product/LOLwebsite/img/logo.png"
          alt=""
        />
      </a>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link"> Đăng ký </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"> Đăng nhập </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout"> Đăng xuất </a>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    ...mapMutations(["initAuthState"]),
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.initAuthState();
  },
};
</script>

<style>
.navbar {
  position: relative;
}
.brand {
  position: absolute;
  left: 50%;
  margin-left: -50px !important; /* 50% of your logo width */
  display: block;
}

body {
  background-color: #FFF!important;
}
</style>
