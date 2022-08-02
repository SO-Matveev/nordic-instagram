import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  increment,
  updateDoc,
} from "firebase/firestore";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import Post from "../../components/Post";
import { auth, db } from "../../app/firebaseApp";
import postConverter from "../../helpers/postConverter";
import Comments from "../../components/Comments";
import commentConverter from "../../helpers/commentConverter";
import { useAuthState } from "react-firebase-hooks/auth";
import CommentForm from "../../components/CommentForm";

const PostPage: NextPage = () => {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(doc(db, "users", String(user?.uid)));
  const router = useRouter();
  const docRef = doc(db, "posts", String(router.query.id));

  const [post] = useDocumentData(docRef.withConverter(postConverter));
  const commenstRef = collection(db, "posts", String(post?.id), "comments");
  const [comments] = useCollectionData(
    query(
      commenstRef.withConverter(commentConverter),
      orderBy("createdAt", "asc")
    )
  );

  const handleCommentSubmit = (data: { text: string }) => {
    if (!user) {
      return;
    }
    const newComment = {
      uid: user.uid,
      user: {
        name: userProfile?.name,
      },
      text: data.text,
      createdAt: serverTimestamp(),
    };
    addDoc(commenstRef, newComment);
    updateDoc(docRef, { commentsCount: increment(1) });
  };

  return (
    <div>
      <h1>Страница поста</h1>
      {post && <Post post={post} />}
      {comments && <Comments comments={comments} />}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default PostPage;
