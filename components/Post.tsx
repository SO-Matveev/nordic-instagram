import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import type PostType from "../types/post";
import { FC } from "react";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

type PostPropTypes = {
  post: PostType;
  onLikeClick?: () => void;
  liked?: boolean;
};

const Post: FC<PostPropTypes> = ({ post, onLikeClick, liked }) => {
  const date = post.createdAt
    ? formatDistance(post.createdAt, new Date(), {
        addSuffix: true,
        locale: ru,
      })
    : "";
  return (
    <Card>
      <CardHeader
        title={post.user.name}
        subheader={post.createdAt ? post.createdAt?.toLocaleDateString() : ""}
      />
      <Link href={`/posts/${post.id}`}>
        <a>
          <CardMedia component="img" image={post.imageURL} />
        </a>
      </Link>

      <CardContent>{post.text}</CardContent>
      <CardActions>
        <IconButton onClick={onLikeClick}>
          <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
          {post.likesCount > 0 ? post.likesCount : ""}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
