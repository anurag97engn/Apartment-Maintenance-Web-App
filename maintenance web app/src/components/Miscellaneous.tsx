import { Form, DatePicker, InputNumber, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { addMiscExpense } from "../api/miscellaneousApi";

const Miscellaneous = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Mutation to add expense
  const mutation = useMutation({
    mutationFn: ({
      date,
      amount,
      description,
    }: {
      date: string;
      amount: number;
      description: string;
    }) => addMiscExpense({ date, amount, description }),
    onSuccess: () => {
      form.resetFields();
      messageApi.success("Expense recorded successfully!");
    },
    onError: () => {
      messageApi.error("Failed to record expense.");
    },
  });

  const onFinish = (values: any) => {
    const { date, amount, description } = values;
    console.log("Form values:", values);
    mutation.mutate({
      date: dayjs(date).format("YYYY-MM-DD"),
      amount,
      description,
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-white via-gray-100 to-blue-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-xl p-6 space-y-6 transition-all duration-300">
        {contextHolder}

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          💸 Record Miscellaneous Payment
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
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
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
            />
          </Form.Item>

          {/* Reason Input */}
          <Form.Item
            name="description"
            label={
              <span className="text-gray-700 dark:text-gray-200">Reason</span>
            }
            rules={[{ required: true, message: "Enter description" }]}
          >
            <Input
              placeholder="e.g., Generator Repair"
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
              placeholder="e.g., 1500"
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="w-full rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Submit Payment
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Miscellaneous;
