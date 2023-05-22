import { deleteDoc } from "firebase/firestore";
import { blogPostDocRef } from "../../middleware/bindings";

export default ({ dispatch }, blogId) =>
  // eslint-disable-next-line
  new Promise(async (resolve, reject) => {
    try {
      const blogPost = blogPostDocRef(blogId);

      await deleteDoc(blogPost);

      await dispatch("watchBlogPosts");

      return resolve();
    } catch (e) {
      console.error("[ deleteBlogPost ]: ", e);

      return reject();
    }
  });
