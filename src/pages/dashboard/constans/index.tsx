import { IPosts } from "../../../interfaces/posts";
import Actions from "../components/actions";

export const columnsPosts = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "userId",
  },

  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
  },
  {
    title: "Actions",
    key: "action",
    render: (item: IPosts) => {
      return <Actions id={item.id.toString()} />;
    },
  },
];
