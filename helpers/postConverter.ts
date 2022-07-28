import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

import Post from "../types/post";

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    return { text: post.text };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options);
    return {
      uid: data.uid,
      user: data.user,
      id: snapshot.id,
      text: data.text,
      imageURL: data.imageURL,
      createdAt: data.createdAt
        ? new Date(data.createdAt?.seconds * 1000)
        : null,
    };
  },
};
export default postConverter;
