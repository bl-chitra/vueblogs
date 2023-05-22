<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blogTitle }}</h2>
      <img :src="blogPhotoFileURL" :alt="blogCoverPhotoName" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostPreview",

  computed: {
    ...mapState([
      "blogTitle",
      "blogHTML",
      "blogPhotoFileURL",
      "blogCoverPhotoName",
    ]),
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

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
