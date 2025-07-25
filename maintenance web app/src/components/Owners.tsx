import { Button, Form, Input, Modal, Space, Table, Tooltip } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOwners, addOwner, updateOwner, deleteOwner } from "../api/ownerApi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const Owners = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["owners"],
    queryFn: getOwners,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<any>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (owner: any) => {
      return editingOwner
        ? updateOwner(editingOwner._id, owner)
        : addOwner(owner);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owners"] });
      setIsModalOpen(false);
      form.resetFields();
      setEditingOwner(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteOwner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });

  const columns = [
    {
      title: (
        <span className="text-gray-700 dark:text-gray-300">🏠 Flat No.</span>
      ),
      align: "center",
      dataIndex: "flatNumber",
      className: "font-medium text-sm font-semibold text-gray-600",
    },
    {
      title: (
        <span className="text-gray-700 dark:text-gray-300">👤 Owner Name</span>
      ),
      align: "center",
      dataIndex: "ownerName",
      className: "font-medium text-sm font-semibold text-gray-600",
      render: (text: any) => <b>{text.toUpperCase()}</b>,
    },
    {
      title: (
        <span className="text-gray-700 dark:text-gray-300">📞 Contact</span>
      ),
      align: "center",
      dataIndex: "contact",
      className: "font-medium text-sm font-semibold text-gray-600",
    },
    {
      title: (
        <span className="text-gray-700 dark:text-gray-300">⚙️ Action</span>
      ),
      align: "center",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit Owner">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingOwner(record);
                form.setFieldsValue(record);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Owner">
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => deleteMutation.mutate(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          🧑‍💼 Apartment Owners
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingOwner(null);
            setIsModalOpen(true);
          }}
          className="font-semibold"
        >
          Add Owner
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        rowKey="_id"
        loading={isLoading}
        bordered
        className="rounded-lg overflow-hidden "
        pagination={{ pageSize: 6 }}
      />

      <Modal
        title={editingOwner ? "Edit Owner" : "Add New Owner"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingOwner(null);
        }}
        onOk={() => {
          form.validateFields().then((values) => mutation.mutate(values));
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="flatNumber"
            label="Flat Number"
            rules={[{ required: true, message: "Flat Number is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ownerName"
            label="Owner Name"
            rules={[{ required: true, message: "Owner Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: "Contact is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Owners;
