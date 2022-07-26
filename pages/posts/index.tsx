import type { NextPage } from "next";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";
import Link from "next/link";
import postConverter from "../../helpers/postConverter";
import { Button } from "@mui/material";

const Posts: NextPage = () => {
  const postsRef = collection(db, "posts").withConverter(postConverter);
  const [posts] = useCollectionData(
    query(postsRef, orderBy("createdAt", "desc"))
  );
  return (
    <div>
      <h1>Список постов</h1>
      <h2>
        {" "}
        <Button variant="text">
          <Link href="/posts/new">Создать новый пост</Link>
        </Button>
      </h2>

      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            {post.createdAt && (
              <span>{post.createdAt.toLocaleDateString()}</span>
            )}{" "}
            <Link href={`/posts/${post.id}`}>{post.text}</Link>
          </div>
        ))}
      <Button variant="outlined" sx={{ mt: 2 }}>
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
};
export default Posts;
