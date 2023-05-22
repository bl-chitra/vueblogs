export default {
  blogPostsFeed: (state) => {
    return state.blogPosts.slice(0, 2);
  },

  blogPostsCards: (state) => {
    return state.blogPosts.slice(2, 6);
  },
};
