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
<<<<<<< HEAD
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
=======
  notification,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import "antd/dist/reset.css";
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17

const Maintenance = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
<<<<<<< HEAD
  const [messageApi, contextHolder] = message.useMessage();
=======
  const [api, contextHolder] = notification.useNotification();

  type NotificationType = "success" | "error";

  const openNotificationWithIcon = (type: NotificationType, desc: string) => {
    api[type]({
      message: type,
      description: desc,
    });
  };
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17

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
<<<<<<< HEAD
      messageApi.success("Maintenance payment recorded successfully!");
    },
    onError: () => {
      messageApi.error("Failed to update ledger.");
=======
      openNotificationWithIcon(
        "success",
        "Maintenance Data Recorded Successfully"
      );
    },
    onError: () => {
      openNotificationWithIcon("error", "Failed to fetch the Ledger");
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
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
<<<<<<< HEAD
      <div className="rounded-2xl bg-gradient-to-br from-white via-gray-100 to-blue-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl p-6 space-y-6 transition-all duration-300">
        {contextHolder}

=======
      {contextHolder}
      <div className="rounded-2xl bg-gradient-to-br from-white via-gray-100 to-blue-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl p-6 space-y-6 transition-all duration-300">
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
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
<<<<<<< HEAD
            <DatePicker style={{ width: "100%" }} />
=======
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
            />
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
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
