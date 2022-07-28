import type { NextPage } from "next";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebaseApp";
import Link from "next/link";
import postConverter from "../../helpers/postConverter";
import { Button } from "@mui/material";
import Post from "../../components/Post";
import Box from "@mui/material/Box";

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
          <Box key={post.id} sx={{ mb: 2, maxWidth: "500px" }}>
            <Post post={post} />
          </Box>
        ))}
      <Button variant="outlined" sx={{ mb: 2 }}>
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
};
export default Posts;
