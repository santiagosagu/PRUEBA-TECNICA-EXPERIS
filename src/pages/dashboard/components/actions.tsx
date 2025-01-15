import { Link } from "react-router";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Popconfirm, PopconfirmProps, message } from "antd";
import { useMutation } from "react-query";
import { deletePost } from "../../../services/deletePost";

interface IDataDelete {
  id: string;
}

export default function Actions({ id }: { id: string }) {
  const mutationDelete = useMutation<string, Error, IDataDelete>({
    mutationFn: (newTodo) => {
      return deletePost(newTodo.id);
    },
  });

  const confirm: PopconfirmProps["onConfirm"] = () => {
    mutationDelete.mutate({ id });
    message.success("Successfully removed");
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.info("It was cancelled");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
          to={`/posts-edit/${id}`}
          data-testid="edit-post"
        >
          <ModeEditOutlineIcon fontSize="small" />
        </Link>

        <Popconfirm
          title="Delete Post"
          description="you really want to delete it?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          okType="danger"
          cancelText="No"
        >
          <div
            className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded cursor-pointer"
            data-testid="delete-post"
          >
            <DeleteForeverIcon fontSize="small" />
          </div>
        </Popconfirm>
      </div>
    </div>
  );
}
