type Post = {
  uid: string;
  user: { name: string };
  id: string;
  text: string;
  createdAt: Date | null;
  imageURL: string;
  likesCount: number;
};

export default Post;
