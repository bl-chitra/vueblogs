import { setDoc } from "firebase/firestore";

export default ({ dispatch }, payload) =>
  // eslint-disable-next-line
  new Promise(async (resolve, reject) => {
    try {
      const blogDocRef = payload.blogDocRef;
      const blogData = {
        blogID: payload.blogID,
        blogHTML: payload.blogHTML,
        blogCoverPhoto: payload.blogCoverPhoto,
        blogCoverPhotoName: payload.blogCoverPhotoName,
        blogTitle: payload.blogTitle,
        date: Date.now(),
      };

      await setDoc(blogDocRef, blogData);

      await dispatch("watchBlogPosts");

      return resolve();
    } catch (e) {
      console.error("[ addBlogPost ]: ", e);

      return reject();
    }
  });
