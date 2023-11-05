import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostType } from "../../types/props.type";

const URL = "http://localhost:8080";

export const getPosts = createAsyncThunk("getPosts", async () => {
  try {
    const { data } = await axios.get(`${URL}/posts`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getPost = createAsyncThunk("getPost", async (id: number) => {
  try {
    const { data } = await axios.get(`${URL}/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id: number, { dispatch }) => {
    try {
      const { data } = await axios.delete(`${URL}/posts/${id}`);
      dispatch(getPosts());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "addPost",
  async (post: PostType, { dispatch }) => {
    try {
      await axios.post(`${URL}/posts`, post);
      dispatch(getPosts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "editPost",
  async (post: PostType, { dispatch }) => {
    await axios.patch(`${URL}/posts/${post.id}`, post);
    dispatch(getPosts());
  }
);
