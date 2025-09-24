import React, { useState } from "react";
import { Modal, Button, Input, Spin, Alert } from "antd";
import {
  useChangeUserStatusMutation,
  useGetCustomerByIdQuery,
} from "../../redux/apiSlices/userSlice";
import { useParams } from "react-router-dom";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const User = () => {
  const { id } = useParams();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { data: userData, isLoading, error } = useGetCustomerByIdQuery(id);
  const [changeUserStatus, { isLoading: changeLoading }] =
    useChangeUserStatusMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description="Failed to fetch user data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const currentUser = userData?.data || {};

  // Handle modal open/close
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle message submission
  const handleSendMessage = () => {
    // Here you would typically send the message to an API
    console.log(`Sending message to ${currentUser.fullName}: ${message}`);
    // Reset message and close modal
    setMessage("");
    setIsModalOpen(false);
  };

  // Handle user status change
  const handleStatusChange = async (action) => {
    try {
      const res = await changeUserStatus({
        id: currentUser._id,
        action,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "User status updated");
      } else {
        toast.error(res?.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update user status");
    }
  };

  return (
    <div className="user-profile-container p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentUser.fullName || "User Profile"}
        </h2>
        {/* <Button type="primary" className="bg-primary py-5" onClick={showModal}>
          Send Message
        </Button> */}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={
                  currentUser?.profileImage?.startsWith("http")
                    ? currentUser.profileImage
                    : `${imageUrl}/${currentUser.profileImage}`
                }
                alt={currentUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              {currentUser.category || "--"}
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name:</p>
              <p className="font-medium">{currentUser.fullName || "--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email:</p>
              <p className="font-medium">{currentUser.email || "--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone:</p>
              <p className="font-medium">{currentUser.phone || "--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">City:</p>
              <p className="font-medium">{currentUser.city || "--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Address:</p>
              <p className="font-medium">{currentUser.address || "--"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Sub Category:</p>
              <p className="font-medium">{currentUser.subCategory || "--"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Description:</p>
          <p className="text-gray-600">{currentUser.description || "--"}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Account Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              currentUser.accountStatus === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {currentUser.accountStatus || "Unknown"}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Activity Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              currentUser.accountActivityStatus === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {currentUser.accountActivityStatus || "Unknown"}
          </span>
        </div>

        <p className="text-gray-600 mb-4">
          {currentUser?.fullName}'s account status is{" "}
          <span
            className={`font-bold ${
              currentUser?.accountStatus === "ACTIVE"
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {currentUser?.accountStatus || "Unknown"}.
          </span>
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() =>
              handleStatusChange(
                currentUser.accountStatus === "ACTIVE" ? "BLOCK" : "ACTIVE"
              )
            }
            disabled={changeLoading}
            className={`px-6 py-2 rounded-md transition ${
              currentUser.accountStatus === "ACTIVE"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            } ${changeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {changeLoading
              ? "Processing..."
              : currentUser.accountStatus === "ACTIVE"
              ? "Block User"
              : "Activate User"}
          </button>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={`Send Message to ${currentUser.fullName || "User"}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={message.trim() ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Send Message
          </Button>,
        ]}
      >
        <p className="text-sm text-gray-600 mb-2">
          Write a professional message. Keep it concise and clear. The recipient
          will receive a notification.
        </p>
        <div className="my-10">
          <Input.TextArea
            rows={5}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full"
          />
        </div>
      </Modal>
    </div>
  );
};

export default User;
