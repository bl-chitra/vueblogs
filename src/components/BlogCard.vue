<template>
  <v-card class="blog-card">
    <v-container v-show="editBlog" class="icons">
      <v-btn class="mx-2" fab small @click="editPost">
        <v-icon class="mdi mdi-square-edit-outline"></v-icon>
      </v-btn>

      <v-btn class="mx-2" fab small @click="deletePost">
        <v-icon class="mdi mdi-delete-outline"></v-icon
      ></v-btn>
    </v-container>

    <img :src="post.blogCoverPhoto" alt="" />

    <v-container class="info">
      <v-card-title>{{ post.blogTitle }}</v-card-title>

      <v-card-text>
        <h6>
          Posted on:
          {{
            new Date(post.date).toLocaleString("en-us", {
              dateStyle: "long",
            })
          }}
        </h6>

        <router-link
          class="link"
          style="color: #000"
          :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
        >
          View the Post &rarr;
        </router-link>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "blogCard",

  props: ["post"],

  computed: {
    ...mapState(["editBlog"]),
  },

  methods: {
    ...mapActions(["deleteBlogPost"]),

    editPost() {
      this.$router.push({
        name: "EditPost",
        params: { blogid: this.post.blogID },
      });
    },

    deletePost() {
      this.deleteBlogPost(this.post.blogID);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;
  width: 265px;

  .icons {
    display: flex;
    position: absolute;
    right: -130px;
    top: -20px;
    z-index: 99;
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 250px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 20px 16px 0px;
    color: #000;

    h6 {
      font-weight: 400;
      font-size: 12px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
    }
  }
}
</style>
