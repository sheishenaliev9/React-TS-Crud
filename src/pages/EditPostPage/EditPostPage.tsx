import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import styles from "./EditPostPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { editPost, getPost } from "../../store/actions/PostsActions";

const EditPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const { id } = useParams();
  const { post } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    if (title.trim() === "" || body.trim() === "") {
      e.preventDefault();
      setIsCorrect(false);
      toast.error("you cannot leave the fields blank");

      setTimeout(() => {
        setIsCorrect(true);
      }, 3000);
      return;
    }
    e.preventDefault();
    const newId = Number(id);
    const editedPost = { id: newId, title, body };
    dispatch(editPost(editedPost));
    toast.success(`Post "${id}" is edited!`);
    navigate(`/posts`);
    setIsCorrect(true);
  };

  useEffect(() => {
    dispatch(getPost(Number(id)));
    toast.info("click on the text to start editing.");
  }, [dispatch, id]);

  return (
    <div className={styles.main}>
      <div>
        <button className="cancel_btn" onClick={() => navigate("/posts")}>
          Cancel
        </button>
      </div>
      <div className={styles.main__inner}>
        <div className={styles.post_title}>
          <textarea
            className="textarea_title"
            style={isCorrect ? {} : { border: "2px solid red" }}
            placeholder="Put your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea_body"
            style={isCorrect ? {} : { border: "2px solid red" }}
            placeholder="Put your body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className={styles.main_actions}>
          <button className={styles.confirm_btn} onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
