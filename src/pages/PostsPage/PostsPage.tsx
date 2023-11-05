import React, { useEffect, useState } from "react";
import { PostType } from "../../types/props.type";
import { NavLink, Link } from "react-router-dom";
import { deletePost, getPosts } from "../../store/actions/PostsActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loader from "../../components/Loader/Loader";
import styles from "./PostsPage.module.css";

const PostsPage: React.FC = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [optionState, setOptionState] = useState("title");
  const [searchState, setSearchState] = useState<"all" | "filtered" | "notFound">("all");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue === "") setSearchState("all");
    else if (optionState === "title") {
      const newFilteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (newFilteredPosts.length === 0) setSearchState("notFound");
      else {
        setSearchState("filtered");
        setFilteredPosts(newFilteredPosts);
      }
    } else if (optionState === "id") {
      const newFilteredPosts = posts.filter(
        (post) => post.id === Number(inputValue)
      );
      if (newFilteredPosts.length === 0) setSearchState("notFound");
      else {
        setSearchState("filtered");
        setFilteredPosts(newFilteredPosts);
      }
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={styles.posts}>
      <div className={styles.title}>
        <h2>All Posts</h2>
      </div>
      <div className={styles.subtitle}>
        <h3>
          Here you can watch, read, delete or edit posts. You can also create a
          new post on the{" "}
          <Link className={styles.createPost_link} to="/create-post">
            create post
          </Link>{" "}
          page.
        </h3>
      </div>

      <div className={styles.search}>
        <select
          value={optionState}
          onChange={(e) => setOptionState(e.target.value)}
          className={styles.search__select}
        >
          <option value="title">Title</option>
          <option value="id">id</option>
        </select>

        <input
          className={styles.search__input}
          type="text"
          placeholder="Search Post"
          value={value}
          onChange={handleSearch}
        />
      </div>
      {searchState === "all" &&
        posts.map((post: PostType) => (
          <Post
            key={post.id}
            post={post}
            deletePost={() => dispatch(deletePost(post.id))}
          />
        ))}

      {searchState === "filtered" &&
        filteredPosts.map((post: PostType) => (
          <Post
            key={post.id}
            post={post}
            deletePost={() => dispatch(deletePost(post.id))}
          />
        ))}
        {searchState === "notFound" && <h1>Not Found</h1>}
    </div>
  );
};

interface PostProps {
  post: PostType;
  deletePost: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ post, deletePost }) => {
  const { id, title } = post;

  return post ? (
    <div className={styles.post}>
      <NavLink to={`/posts/${id}`}>
        <p className={styles.post__title}>
          {id} - {title}
        </p>
      </NavLink>
      <div className={styles.post_actions}>
        <NavLink to={`/posts/edit-post/${id}`}>
          <button>Edit</button>
        </NavLink>
        <button onClick={() => deletePost(id)}>Delete</button>
      </div>
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default PostsPage;
