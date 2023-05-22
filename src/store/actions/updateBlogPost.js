import { updateDoc } from "firebase/firestore";
import { blogPostDocRef } from "../../middleware/bindings";

export default ({ dispatch }, payload) =>
  // eslint-disable-next-line
  new Promise(async (resolve, reject) => {
    try {
      const blogPostRef = blogPostDocRef(payload.routeID);

      if (payload.file) {
        await updateDoc(blogPostRef, {
          blogHTML: payload.blogHTML,
          blogCoverPhoto: payload.blogCoverPhoto,
          blogCoverPhotoName: payload.blogCoverPhotoName,
          blogTitle: payload.blogTitle,
        });
      } else {
        await updateDoc(blogPostRef, {
          blogHTML: payload.blogHTML,
          blogTitle: payload.blogTitle,
        });
      }

      await dispatch("watchBlogPosts");

      return resolve();
    } catch (e) {
      console.error("[ updateBlogPost ]: ", e);

      return reject();
    }
  });
