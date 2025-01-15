import { http } from "msw";
import { mockHttpResponseGetPost } from "../pages/createPost/mocks/getPost";
import { mockHttpResponseCreatePost } from "../pages/createPost/mocks/createPost";
import { mockHttpResponseUpdatePost } from "../pages/createPost/mocks/updatePost";
import { mockHttpResponseGetPostsDashboard } from "../pages/dashboard/mocks/getPosts";
import { mockHttpResponseDeletePost } from "../pages/dashboard/mocks/deletePost";

export const handlers = [
  http.get(
    `https://jsonplaceholder.typicode.com/posts`,
    mockHttpResponseGetPostsDashboard
  ),
  http.get(
    `https://jsonplaceholder.typicode.com/posts/1`,
    mockHttpResponseGetPost
  ),

  http.post(
    `https://jsonplaceholder.typicode.com/posts`,
    mockHttpResponseCreatePost
  ),
  http.put(
    `https://jsonplaceholder.typicode.com/posts/1`,
    mockHttpResponseUpdatePost
  ),
  http.delete(
    `https://jsonplaceholder.typicode.com/posts/1`,
    mockHttpResponseDeletePost
  ),
];
