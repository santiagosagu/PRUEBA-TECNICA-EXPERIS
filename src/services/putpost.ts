import axios from "axios";

export const putPost = async (id: string, title: string, body: string) => {
  const { data } = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      title,
      body,
    }
  );
  return data;
};
