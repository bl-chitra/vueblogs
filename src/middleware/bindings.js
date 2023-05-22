import { collection, doc, getFirestore } from "firebase/firestore";
import app from "@/middleware/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export const db = getFirestore(app);

export const blogPostsRef = () => {
  return collection(db, "blogPosts");
};

export const newBlogPostDocRef = () => {
  return doc(collection(db, "blogPosts"));
};

export const blogPostDocRef = (blogID) => {
  return blogID ? doc(db, "blogPosts", blogID) : null;
};

export const storageRef = firebase.storage().ref();

export const imgDocRef = (path) => {
  return storageRef.child(path);
};
