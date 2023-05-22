<template>
  <v-app>
    <div id="app" v-if="postLoaded">
      <Navigation />
      <router-view />
      <AuthenticationGuard />
    </div>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import "firebase/compat/auth";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "app",
  components: { Navigation },
  mounted() {
    this.watchBlogPosts();
  },
  computed: {
    ...mapGetters("auth", ["getCurrentUser"]),
    ...mapState(["postLoaded"]),
  },
  methods: {
    ...mapActions(["watchBlogPosts"]),
  },
  watch: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.link {
  color: #fff;
}
nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #000;
  }
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
