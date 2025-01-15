import axios from "axios";

export const postCreate = async (title: string, body: string) => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title,
      body,
    }
  );
  return data;
};
