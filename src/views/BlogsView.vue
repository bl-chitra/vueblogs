<template>
  <div class="blog-card-wrap">
    <div class="blog-cards">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import BlogCard from "@/components/BlogCard.vue";

export default {
  name: "BlogsView",

  components: { BlogCard },

  computed: {
    ...mapState(["blogPosts", "editBlog"]),
    editPost: {
      get() {
        return this.editBlog;
      },
      set(payload) {
        this.TOGGLE_EDIT_BLOG(payload);
      },
    },
  },

  methods: {
    ...mapMutations(["TOGGLE_EDIT_BLOG"]),
  },

  beforeDestroy() {
    this.TOGGLE_EDIT_BLOG(false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;
  margin-left: 1%;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #303030;
      left: 52px;
    }
  }
}
</style>
