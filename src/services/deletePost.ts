import axios from "axios";

export const deletePost = async (id: string) => {
  const { data } = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};
