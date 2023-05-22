<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <Loading v-show="loading" />

    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input
          type="text"
          placeholder="Enter Blog Title"
          v-model="blogPostTitle"
        />

        <div class="upload-file">
          <label for="blog-photo">UPLOAD COVER PHOTO</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          &emsp;
          <v-btn @click="OPEN_PHOTO_PREVIEW" dark :disabled="!blogPhotoFileURL">
            Preview Photo
          </v-btn>
          <span> {{ blogCoverPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogPostHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>

      <div class="blog-actions">
        <button @click="updateBlog">SAVE CHANGES</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";

import { imgDocRef, blogPostDocRef } from "../middleware/bindings";

import Quill from "quill";
window.Quill = Quill;

const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "EditPost",

  data: () => ({
    file: null,
    error: null,
    errorMsg: null,
    loading: null,
    routeID: null,
    currentBlog: null,
    editorSettings: {
      modules: {
        imageResize: {},
      },
    },
  }),

  components: {
    BlogCoverPreview,
    Loading,
  },

  async mounted() {
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.blogPosts.filter((post) => {
      return post.blogID === this.routeID;
    });
    this.SET_BLOG_STATE(this.currentBlog[0]);
  },

  computed: {
    ...mapState([
      "blogTitle",
      "blogHTML",
      "blogCoverPhotoName",
      "blogPhotoPreview",
      "blogPhotoFileURL",
      "blogPosts",
    ]),

    blogPostTitle: {
      get() {
        return this.blogTitle;
      },
      set(payload) {
        this.UPDATE_BLOG_TITLE(payload);
      },
    },

    blogPostHTML: {
      get() {
        return this.blogHTML;
      },
      set(payload) {
        this.NEW_BLOG_POST(payload);
      },
    },
  },

  methods: {
    ...mapMutations([
      "UPDATE_BLOG_TITLE",
      "NEW_BLOG_POST",
      "FILE_NAME_CHANGE",
      "CREATE_FILE_URL",
      "OPEN_PHOTO_PREVIEW",
      "SET_BLOG_STATE",
    ]),

    ...mapActions(["updateBlogPost"]),

    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];

      const fileName = this.file.name;

      this.FILE_NAME_CHANGE(fileName);

      this.CREATE_FILE_URL(URL.createObjectURL(this.file));
    },

    imageHandler: (file, Editor, cursorLocation, resetUploader) => {
      const docRef = imgDocRef(`documents/BlogPostPhotos/${file.name}`);

      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },

    async updateBlog() {
      const blogPostRef = blogPostDocRef(this.routeID);

      var payload = {
        routeID: this.routeID,
        blogHTML: this.blogHTML,
        blogTitle: this.blogTitle,
      };

      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.loading = true;

          const docRef = imgDocRef(
            `documents/BlogCoverPhotos/${this.blogCoverPhotoName}`
          );

          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();

              (payload.file = true),
                (payload.blogCoverPhoto = downloadURL),
                (payload.blogCoverPhotoName = this.blogCoverPhotoName),
                await this.updateBlogPost(payload);

              this.loading = false;

              this.$router.push({
                name: "ViewBlog",
                params: { blogid: blogPostRef.id },
              });
            }
          );
          return;
        }
        this.loading = true;

        await this.updateBlogPost(payload);

        this.loading = false;

        this.$router.push({
          name: "ViewBlog",
          params: { blogid: blogPostRef.id },
        });
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";

      setTimeout(() => {
        this.error = false;
      }, 5000);

      return;
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
