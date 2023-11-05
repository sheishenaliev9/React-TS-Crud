import { createContext, useState } from "react";
import { PostType } from "../types/props.type";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface PostContextType {
  posts: PostType[];
  post: PostType;
  goBack: () => void;
  getPost: (id: number) => void;
  deletePost: (id: number) => void;
  addPost: (title: string, body: string) => void;
  editPost: (id: number, title: string, body: string) => void;
}

export const postContext = createContext({} as PostContextType);

const URL = "http://localhost:8080";

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostType>({ id: 0, title: "", body: "" });
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${URL}/posts`);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async (id: number) => {
    try {
      const { data }: { data: PostType } = await axios.get(
        `${URL}/posts/${id}`
      );
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`${URL}/posts/${id}`);
      toast.success(`Post "${id}" is delited.`);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async (title: string, body: string) => {
    try {
      const id = posts[posts.length - 1] ? posts[posts.length - 1].id + 1 : 1;
      const newPost: PostType = { id: id, title: title, body: body };
      await axios.post(`${URL}/posts`, newPost);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (id: number, title: string, body: string) => {
    try {
      const editedPost = { id, title, body };
      await axios.patch(`${URL}/posts/${id}`, editedPost);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => navigate("/posts");

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        post,
        goBack,
        getPost,
        addPost,
        deletePost,
        editPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
