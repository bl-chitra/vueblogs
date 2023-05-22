import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../middleware/bindings";

export default ({ state, commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit("SET_BLOG_POSTS", []);

      state.postLoaded = false;

      const q = query(collection(db, "blogPosts"), orderBy("date", "desc"));

      onSnapshot(q, (snapshot) => {
        const blogPosts = state.blogPosts;

        console.log("[ watchBlogPosts ]: activated!");

        snapshot.docChanges().forEach((change) => {
          const blogID = change.doc.id;
          const data = { ...change.doc.data(), id: blogID };
          const index = blogPosts.findIndex(
            (blogPost) => blogPost.id === blogID
          );

          // posts added or modified
          if (["added", "modified"].includes(change.type)) {
            // add new posts
            if (typeof index === "undefined" || index === -1) {
              blogPosts.push(data);
            }

            // modify existing posts
            else {
              blogPosts[index] = data;
              console.log(
                "[ watchBlogPosts ]: blogID: [",
                blogID,
                "] modified!"
              );
            }
          }

          // post removed
          if (change.type === "removed") {
            blogPosts.splice(index, 1);
            console.log(
              "[ watchBlogPosts ]: blogID: [",
              blogID,
              "] removed! Index:",
              index
            );
          }
        });

        commit("SET_BLOG_POSTS", [...blogPosts]);

        state.postLoaded = true;

        return resolve();
      });
    } catch (e) {
      console.error("[ watchBlogPosts ]: ", e);

      return reject();
    }
  });
