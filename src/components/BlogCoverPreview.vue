<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <span
        class="mdi mdi-close-circle-outline icon"
        @click="OPEN_PHOTO_PREVIEW()"
      ></span>
      <img :src="this.blogPhotoFileURL" alt="" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "BlogCoverPreview",

  methods: {
    ...mapMutations(["OPEN_PHOTO_PREVIEW"]),
  },

  computed: {
    ...mapState(["blogPhotoFileURL"]),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
