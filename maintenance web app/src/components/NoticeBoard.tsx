import {
  Button,
  Input,
  Modal,
  Space,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../api/noticeApi";
import { useState } from "react";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const NoticeBoard = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState("");
  const [editingNotice, setEditingNotice] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });

  const currentNotice = data?.data?.[0];

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return editingNotice
        ? updateNotice(editingNotice._id, data)
        : addNotice(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      message.success("Notice saved successfully!");
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      message.success("Notice deleted!");
    },
  });

  const openEditor = () => {
    setNoticeText(currentNotice?.title || "");
    setEditingNotice(currentNotice || null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 border-b bg-white">
      <div>
        <Title level={5} className="!mb-1">
          Notice Board
        </Title>
        <Paragraph className="!mb-0 text-gray-700">
          {currentNotice?.title || "No active notice yet."}
        </Paragraph>
      </div>

      <Space>
        {currentNotice && (
          <Popconfirm
            title="Are you sure you want to delete this notice?"
            onConfirm={() => deleteMutation.mutate(currentNotice._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="default">
              Delete
            </Button>
          </Popconfirm>
        )}

        <Button type="primary" onClick={openEditor}>
          {currentNotice ? "Edit" : "Add"} Notice
        </Button>
      </Space>

      <Modal
        title={editingNotice ? "Edit Notice" : "Add New Notice"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          if (!noticeText.trim()) {
            return message.error("Notice content cannot be empty");
          }
          mutation.mutate({ title: noticeText.trim() });
        }}
      >
        <TextArea
          rows={4}
          value={noticeText}
          onChange={(e) => setNoticeText(e.target.value)}
          placeholder="Enter notice here..."
        />
      </Modal>
    </div>
  );
};

export default NoticeBoard;
