import type { NextPage } from "next";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";
import Link from "next/link";
import postConverter from "../../helpers/postConverter";

const Posts: NextPage = () => {
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const [posts] = useCollectionData(
    query(postsRef, orderBy("createdAt", "desc"))
  );
  return (
    <div>
      <h1>Список постов</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            {post.createdAt && (
              <span>{post.createdAt.toLocaleDateString()}</span>
            )}{" "}
            <Link href={`/posts/${post.id}`}>{post.text}</Link>
          </div>
        ))}
    </div>
  );
};
export default Posts;
