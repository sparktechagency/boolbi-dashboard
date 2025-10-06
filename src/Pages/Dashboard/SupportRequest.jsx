import React, { useState } from "react";
import {
  Table,
  Select,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  Image,
  Upload,
  message,
} from "antd";
import { EyeOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetSupportRequestsQuery,
  useGiveSupportReplyMutation,
} from "../../redux/apiSlices/aboutSlice";
import { imageUrl } from "../../redux/api/baseApi";

const { TextArea } = Input;

const SupportRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [replyImage, setReplyImage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [form] = Form.useForm();

  const {
    data: getSupportRequests,
    isLoading,
    refetch,
  } = useGetSupportRequestsQuery({
    page: 1,
    limit: 10,
    status: statusFilter !== "all" ? statusFilter : "",
  });

  const [giveSupportReply, { isLoading: isReplying }] =
    useGiveSupportReplyMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const data = getSupportRequests?.data?.data || [];

  const handleReply = async (values) => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("supportId", selectedRequest._id);
      formData.append("message", values.reply);

      // Add image if exists
      if (replyImage && replyImage.file) {
        formData.append("image", replyImage.file);
      }

      // Send the reply
      const response = await giveSupportReply(formData).unwrap();

      if (response.success) {
        message.success("Reply sent successfully");
      } else {
        message.error(response.message || "Failed to send reply");
      }

      // Reset form and close modal
      form.resetFields();
      setReplyImage(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending reply:", error);
      message.error(error.data?.message || "Failed to send reply");
    }
  };

  const showRequestDetails = (record) => {
    setSelectedRequest(record);
    setReplyImage(null);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (_, record, index) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: ["for", "fullName"],
      key: "userName",
      render: (_, record) => {
        return record?.for?.fullName || "N/A";
      },
    },
    {
      title: "Email",
      dataIndex: ["for", "email"],
      key: "email",
      render: (_, record) => {
        return record?.for?.email || "N/A";
      },
    },
    {
      title: "Problem Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return category || "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let className = "";
        switch (status) {
          case "PENDING":
            className = "bg-[#fff1a0] text-black";
            break;
          case "SOLVED":
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
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            // Force refetch when filter changes
            refetch();
          }}
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
                  <p className="font-medium">
                    {selectedRequest?.for?.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-medium">
                    {selectedRequest?.createdAt
                      ? new Date(
                          selectedRequest?.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Category:</p>
                  <p className="font-medium">
                    {selectedRequest?.category || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status:</p>
                  <p className="font-medium">
                    {selectedRequest?.status || "-"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Message:</p>
                <div className="flex gap-4 w-full">
                  <p className="bg-white p-3 rounded flex-1 w-[70%]">
                    {selectedRequest?.message || "-"}
                  </p>
                  <div className="w-[30%]">
                    {selectedRequest?.image && (
                      <Image
                        src={
                          selectedRequest?.image?.startsWith("http")
                            ? selectedRequest?.image
                            : `${imageUrl}${selectedRequest?.image}`
                        }
                        alt="Support request attachment"
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                </div>
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

              <Form.Item label="Attach Image (Optional)">
                <div className="space-y-3">
                  <Upload
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage) {
                        message.error("You can only upload image files!");
                        return false;
                      }
                      const isLt5M = file.size / 1024 / 1024 < 5;
                      if (!isLt5M) {
                        message.error("Image must be smaller than 5MB!");
                        return false;
                      }

                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setReplyImage({
                          file: file,
                          preview: e.target.result,
                        });
                      };
                      reader.readAsDataURL(file);
                      return false; // Prevent auto upload
                    }}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />} disabled={!!replyImage}>
                      {replyImage ? "Image Selected" : "Upload Image"}
                    </Button>
                  </Upload>

                  {replyImage && (
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                      <Image
                        src={replyImage.preview}
                        alt="Reply attachment"
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {replyImage.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(replyImage.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => setReplyImage(null)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>
                  )}
                </div>
              </Form.Item>

              <Form.Item className="mb-0 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#63666A] hover:bg-[#63666A]/90"
                  loading={isReplying}
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
