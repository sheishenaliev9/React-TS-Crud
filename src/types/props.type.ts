export interface PostType {
  id: number;
  title: string;
  body: string;
}

export interface PostProps {
  post: PostType;
  deletePost: (id: number) => void;
}
