import type { NextPage } from "next";
import { useRouter } from "next/router";
import { doc, collection } from "firebase/firestore";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import Post from "../../components/Post";
import { db } from "../../app/firebaseApp";
import postConverter from "../../helpers/postConverter";
import Comments from "../../components/Comments";
import commentConverter from "../../helpers/commentConverter";

const PostPage: NextPage = () => {
  const router = useRouter();
  const docRef = doc(db, "posts", String(router.query.id)).withConverter(
    postConverter
  );
  const [post] = useDocumentData(docRef);
  const commenstRef = collection(
    db,
    "posts",
    String(post?.id),
    "comments"
  ).withConverter(commentConverter);
  const [comments] = useCollectionData(commenstRef);
  return (
    <div>
      <h1>Страница поста</h1>
      {post && <Post post={post} />}
      {comments && <Comments comments={comments} />}
    </div>
  );
};

export default PostPage;
