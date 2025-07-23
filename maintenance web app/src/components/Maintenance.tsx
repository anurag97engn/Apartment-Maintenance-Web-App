import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOwners, addLedger } from "../api/ownerApi";
import {
  Form,
  Select,
  DatePicker,
  InputNumber,
  Input,
  Button,
  message,
  Card,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const Maintenance = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch owners
  const { data: ownersData, isLoading: loadingOwners } = useQuery({
    queryKey: ["owners"],
    queryFn: getOwners,
  });

  // Ledger mutation
  const ledgerMutation = useMutation({
    mutationFn: ({
      id,
      ledgerEntry,
    }: {
      id: string;
      ledgerEntry: { date: string; amount: number; description: string };
    }) => addLedger(id, ledgerEntry),
    onSuccess: () => {
      form.resetFields();
      queryClient.invalidateQueries(["owners"]);
      messageApi.success("Maintenance payment recorded successfully!");
    },
    onError: () => {
      messageApi.error("Failed to update ledger.");
    },
  });

  const onFinish = (values: any) => {
    const { flatId, date, amount, reason } = values;

    ledgerMutation.mutate({
      id: flatId,
      ledgerEntry: {
        date: dayjs(date).format("YYYY-MM-DD"),
        amount,
        description: reason || "Maienance paid",
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-white via-gray-100 to-blue-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl p-6 space-y-6 transition-all duration-300">
        {contextHolder}

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          💸 Record Maintenance Payment
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Flat Selector */}
          <Form.Item
            name="flatId"
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Select Flat
              </span>
            }
            rules={[{ required: true, message: "Please select a flat" }]}
          >
            <Select
              placeholder="Choose flat"
              loading={loadingOwners}
              className="rounded-md"
              options={ownersData?.data.map((owner: any) => ({
                label: `${owner.flatNumber} - ${owner.ownerName.toUpperCase()}`,
                value: owner._id,
              }))}
              onChange={(val) => setSelectedOwnerId(val)}
            />
          </Form.Item>

          {/* Date Picker */}
          <Form.Item
            name="date"
            label={
              <span className="text-gray-700 dark:text-gray-200">
                Payment Date
              </span>
            }
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="reason"
            label={
              <span className="text-gray-700 dark:text-gray-200">Reason</span>
            }
            rules={[{ required: true, message: "Enter reason" }]}
          >
            <Input
              placeholder="e.g., June Maintenance"
              className="rounded-md"
            />
          </Form.Item>

          {/* Amount Input */}
          <Form.Item
            name="amount"
            label={
              <span className="text-gray-700 dark:text-gray-200">Amount</span>
            }
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              className="rounded-md"
              placeholder="e.g., 1000"
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={ledgerMutation.isPending}
            className="w-full rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Submit Payment
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Maintenance;
