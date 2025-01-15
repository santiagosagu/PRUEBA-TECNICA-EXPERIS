import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const CustomModal = ({
  isModalOpen,
  setIsModalOpen,
  loading,
  isSuccess,
  isError,
  errorMessage,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const determineTitle = () => {
      if (isSuccess) {
        return "Success!";
      } else if (errorMessage) {
        return "Error!";
      } else if (loading) {
        return "Loading...";
      } else {
        return "Default Title";
      }
    };

    setTitle(determineTitle());
  }, [isSuccess, errorMessage, loading, setTitle]);

  const handleOk = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      zIndex={3000}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <p>
        {isSuccess
          ? "It has been saved successfully"
          : isError && "An error has occurred"}
      </p>
      <p>{errorMessage}</p>
      <p>{loading && "Loading..."}</p>
    </Modal>
  );
};
