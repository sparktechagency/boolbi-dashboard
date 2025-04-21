import React, { useState } from "react";
import { Table, Select, Button, Modal, Form, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SupportRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();

  const data = [
    {
      serialNo: "01",
      userName: "Ebrahim",
      email: "Ebrahim@Gmail.Com",
      problemCategory: "System Problem",
      status: "Pending",
      message:
        "I'm having issues with the login system. It keeps showing an error.",
      date: "2024-01-15",
    },
    {
      serialNo: "01",
      userName: "Ebrahim",
      email: "Ebrahim@Gmail.Com",
      problemCategory: "System Problem",
      status: "Solved",
    },
    // Add more data as needed
  ];

  const handleReply = (values) => {
    console.log("Reply to request:", selectedRequest, "Response:", values);
    form.resetFields();
    setIsModalOpen(false);
  };

  const showRequestDetails = (record) => {
    setSelectedRequest(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Problem Category",
      dataIndex: "problemCategory",
      key: "problemCategory",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let className = "";
        switch (status) {
          case "Pending":
            className = "bg-[#63666A] text-white";
            break;
          case "Solved":
            className = "bg-[#E7FFE7] text-[#00B907]";
            break;
          default:
            className = "bg-[#63666A] text-white";
        }
        return (
          <span className={`px-4 py-1 rounded-md text-sm ${className}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="text-[#63666A]"
          onClick={() => showRequestDetails(record)}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Support Request</h2>
        <Select
          defaultValue="Pending"
          className="w-32"
          options={[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "solved", label: "Solved" },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        className="custom-table"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Support Request Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">From:</p>
                  <p className="font-medium">{selectedRequest.userName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-medium">{selectedRequest.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Category:</p>
                  <p className="font-medium">
                    {selectedRequest.problemCategory}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status:</p>
                  <p className="font-medium">{selectedRequest.status}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Message:</p>
                <p className="bg-white p-3 rounded">
                  {selectedRequest.message}
                </p>
              </div>
            </div>

            <Form form={form} layout="vertical" onFinish={handleReply}>
              <Form.Item
                name="reply"
                label="Your Reply"
                rules={[
                  {
                    required: true,
                    message: "Please write your reply!",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Type your response here..."
                  className="resize-none"
                />
              </Form.Item>

              <Form.Item className="mb-0 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#63666A] hover:bg-[#63666A]/90"
                >
                  Send Reply
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportRequest;
