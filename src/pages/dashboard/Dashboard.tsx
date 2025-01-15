import { useQuery } from "react-query";
import { getAllPost } from "../../services/getAllPost";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { columnsPosts } from "./constans";
import { IPosts } from "../../interfaces/posts";

export default function Dashboard() {
  const { error, data, isLoading } = useQuery<IPosts[], Error>({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  const [post, setPost] = useState<IPosts[] | []>([]);

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className=" h-full flex flex-col py-4">
      <h1 className="text-3xl mb-4 font-semibold">Dashboard</h1>
      <div className="w-full overflow-x-auto">
        <Table dataSource={post} columns={columnsPosts} key="id" />
      </div>
    </div>
  );
}
