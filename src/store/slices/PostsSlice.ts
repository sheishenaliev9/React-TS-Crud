import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPost, getPosts } from "../actions/PostsActions";
import { PostType } from "../../types/props.type";


interface PostsState {
  posts: PostType[];
  post: PostType | null;
}

const initialState: PostsState = {
  posts: [],
  post: {} as PostType || null,
};


const PostsSlice = createSlice({
  name: "PostsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled.type]: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    [getPosts.rejected.type]: (state, action: PayloadAction<Error>) => {
      console.error("Failed to get posts:", action.payload.message);
    },
    [getPost.fulfilled.type]: (state, action: PayloadAction<PostType>) => {
      state.post = action.payload;
    },
  },
});

export default PostsSlice.reducer;
