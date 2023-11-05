import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./CreatePost.module.css";
import { addPost } from "../../store/actions/PostsActions";
import { PostType } from "../../types/props.type";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const CreatePostPage: React.FC = () => {
  const [postValues, setPostValues] = useState({ title: "", body: "" });
  const [isCorrect, setIsCorrect] = useState(true);
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    const { title, body } = postValues;
    if (title.trim() === "" || body.trim() === "") {
      e.preventDefault();
      toast.error("you cannot leave the fields blank");
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(true);
      }, 3000);
      return;
    }
    e.preventDefault();
    const id = posts[posts.length - 1] ? posts[posts.length - 1].id + 1 : 1;
    const newPost: PostType = { id, title, body };
    dispatch(addPost(newPost));
    setPostValues({ title: "", body: "" });
    toast.success("New post is added!");
    navigate("/posts");
    setIsCorrect(true);
  };

  useEffect(() => {
    toast.info("click on the text to start writing your text.");
  }, []);

  return (
    <div className={styles.formWrapper}>
      <button className="cancel_btn" onClick={() => navigate("/posts")}>
        Cancel
      </button>
      <div className={styles.formWrapper_inner}>
        <div className={styles.formBlock}>
          <textarea
            className="textarea_title"
            style={isCorrect ? {} : { border: "2px solid red" }}
            placeholder="Put your title"
            value={postValues.title}
            onChange={(e) =>
              setPostValues({ ...postValues, title: e.target.value })
            }
          />
          <textarea
            className="textarea_body"
            style={isCorrect ? {} : { border: "2px solid red" }}
            placeholder="Put your body"
            value={postValues.body}
            onChange={(e) =>
              setPostValues({ ...postValues, body: e.target.value })
            }
          />

          <div className={styles.formBlock_actions}>
            <button className={styles.addPost_btn} onClick={handleSubmit}>
              Add Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
