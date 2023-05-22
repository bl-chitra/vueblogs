export default {
  SET_BLOG_POSTS: (state, blogPosts) => (state.blogPosts = blogPosts),

  NEW_BLOG_POST: (state, blogHTML) => (state.blogHTML = blogHTML),

  UPDATE_BLOG_TITLE: (state, blogTitle) => (state.blogTitle = blogTitle),

  FILE_NAME_CHANGE: (state, fileName) => (state.blogCoverPhotoName = fileName),

  CREATE_FILE_URL: (state, fileURL) => (state.blogPhotoFileURL = fileURL),

  OPEN_PHOTO_PREVIEW: (state) =>
    (state.blogPhotoPreview = !state.blogPhotoPreview),

  TOGGLE_EDIT_BLOG: (state, payload) => (state.editBlog = payload),

  SET_BLOG_STATE: (state, payload) => {
    state.blogTitle = payload.blogTitle;
    state.blogHTML = payload.blogHTML;
    state.blogPhotoFileURL = payload.blogCoverPhoto;
    state.blogCoverPhotoName = payload.blogCoverPhotoName;
  },
};
