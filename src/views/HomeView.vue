<template>
  <div>
    <BlogPost :post="welcomeScreen" />

    <BlogPost
      :post="post"
      v-for="(post, index) in blogPostsFeed"
      :key="index"
    />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";
import BlogCard from "@/components/BlogCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "HomeView",

  components: { BlogPost, BlogCard },

  data: () => ({
    welcomeScreen: {
      title: "Welcome!",
      blogPost: "Blog articles for HTML, CSS, JavaScript and more!",
      welcomeScreen: true,
      photo: "welcome",
    },
  }),

  computed: {
    ...mapGetters(["blogPostsFeed", "blogPostsCards"]),
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-top: -36px;
    margin-bottom: 32px;
  }
}
</style>
