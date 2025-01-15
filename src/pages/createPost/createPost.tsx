import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { ICreatePost, IPosts, IRequiredPost } from "../../interfaces/posts";
import { getPost } from "../../services/getpost";
import TextArea from "antd/es/input/TextArea";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { putPost } from "../../services/putpost";
import { postCreate } from "../../services/postCreate";
import { CustomModal } from "../../components/modal";

export default function CreatePost() {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorInternal, setErrorInternal] = useState<string | null | undefined>(
    null
  );

  const { error, data, isLoading } = useQuery<IPosts, Error>({
    queryKey: ["posts-edit"],
    queryFn: () => getPost(params.id || ""),

    enabled: !!params.id,
  });

  const mutationEdit = useMutation<IPosts, Error, IRequiredPost>({
    mutationFn: (newTodo: IRequiredPost) => {
      return putPost(newTodo.id.toString(), newTodo.title, newTodo.body);
    },
  });

  const mutationCreate = useMutation<IPosts, Error, ICreatePost>({
    mutationFn: (newTodo: ICreatePost) => {
      return postCreate(newTodo.title, newTodo.body);
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitEdit = () => {
    if (!title || !body) {
      setErrorInternal("Title and body are required");
      showModal();
      return;
    }

    if (params.id) {
      mutationEdit.mutate({
        id: params.id,
        title,
        body,
      });
    }

    showModal();
  };

  const handleSubmitCreate = () => {
    if (!title || !body) {
      setErrorInternal("Title and body are required");
      showModal();
      return;
    }
    mutationCreate.mutate({
      title,
      body,
    });
    showModal();
  };

  useEffect(() => {
    if (data && params.id) {
      setTitle(data.title);
      setBody(data.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [data, params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className=" py-4 h-full flex flex-col">
      <h1 className="text-3xl mb-8 font-semibold">
        {params.id ? "Edit Post" : "Create Post"}
      </h1>
      <div className="w-full justify-center items-center flex">
        <form className="w-[800px] bg-slate-200 flex flex-col p-6 gap-5 rounded-md">
          <div>
            <label id="title-label">Title:</label>
            <Input
              placeholder="Basic usage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-labelledby="title-label"
            />
          </div>
          <div>
            <label id="body-label">Body:</label>
            <TextArea
              placeholder="textarea with clear icon"
              allowClear
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              aria-labelledby="body-label"
              aria-describedby="body-label"
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={params.id ? handleSubmitEdit : handleSubmitCreate}
            >
              {params.id ? "Update" : "Create"}
            </Button>
          </div>
        </form>
        <CustomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          loading={mutationEdit.isLoading || mutationCreate.isLoading}
          isSuccess={mutationEdit.isSuccess || mutationCreate.isSuccess}
          isError={mutationEdit.isError || mutationCreate.isError}
          errorMessage={
            mutationEdit.error?.message ??
            mutationCreate.error?.message ??
            errorInternal
          }
        />
      </div>
    </div>
  );
}
