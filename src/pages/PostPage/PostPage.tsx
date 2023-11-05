import React, { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router";
import styles from "./PostPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getPost } from "../../store/actions/PostsActions";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const { post } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goBack = () => navigate("/posts");

  useEffect(() => {
    dispatch(getPost(Number(id)));
  }, []);

  return (
    <div className={styles.postWrapper}>
      {post ? (
        <div className={styles.main}>
          <div className={styles.main__title}>
            <textarea className="textarea_title" value={post.title} disabled />
            <textarea className="textarea_body" value={post.body} disabled />
          </div>

          <div className={styles.main__actions}>
            <button onClick={goBack}>Go Back</button>
          </div>
        </div>
      ) : (
        <div className={styles.loader_block}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PostPage;
