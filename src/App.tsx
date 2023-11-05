import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import PostPage from "./pages/PostPage/PostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/edit-post/:id" element={<EditPostPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
