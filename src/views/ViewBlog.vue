<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>

      <h4>
        Posted on:
        {{
          new Date(this.currentBlog[0].date).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>

      <img
        :src="this.currentBlog[0].blogCoverPhoto"
        :alt="this.currentBlog[0].blogCoverPhotoName"
      />

      <div
        class="post-content ql-editor"
        v-html="this.currentBlog[0].blogHTML"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ViewBlog",

  data: () => ({
    currentBlog: null,
  }),

  computed: {
    ...mapState(["blogPosts"]),
  },

  async created() {
    this.currentBlog = await this.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-size: 32px;
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
