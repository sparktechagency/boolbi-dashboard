import React, { useState } from "react";
import { Button, Modal, Input, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import {
  useChangeProviderStatusMutation,
  useGetProviderByIdQuery,
} from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const Vendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const { data: providerData, isLoading, error } = useGetProviderByIdQuery(id);
  const [changeProviderStatus, { isLoading: changeLoading }] = useChangeProviderStatusMutation();

  const provider = providerData?.data;

  // Modal state

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description="Failed to fetch provider data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }
  // Handle modal open/close
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle message submission
  const handleSendMessage = () => {
    console.log(`Sending message to ${provider?.fullName}: ${message}`);
    setMessage("");
    setIsModalOpen(false);
  };

  // Handle provider status change
  const handleStatusChange = async (action) => {
    try {
      const res = await changeProviderStatus({
        id: provider._id,
        action,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Provider status updated");
      } else {
        toast.error(res?.message || "Failed to update provider status");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update provider status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          About Service Providers
        </h2>
        {/* <Button type="primary" className="bg-primary py-5" onClick={showModal}>
          Send Message
        </Button> */}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                  <img
                    src={
                      provider?.profileImage
                        ? `${imageUrl}${provider.profileImage}`
                        : "/default-avatar.png"
                    }
                    alt={provider?.fullName || "Provider"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {provider?.category || "N/A"}
                </p>
              </div>

              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Name:</p>
                  <p className="font-medium">{provider?.fullName || "N/A"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="font-medium">{provider?.email || "N/A"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Phone:</p>
                  <p className="font-medium">{provider?.phone || "N/A"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">City:</p>
                  <p className="font-medium">{provider?.city || "N/A"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Address:</p>
                  <p className="font-medium">{provider?.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Category:</p>
              <p className="font-medium">{provider?.category || "N/A"}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Sub Category:</p>
              <p className="font-medium">{provider?.subCategory || "N/A"}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Account Status:</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  provider?.accountStatus === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {provider?.accountStatus || "N/A"}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Activity Status:</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  provider?.accountActivityStatus === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {provider?.accountActivityStatus || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">
          Hello, this Provider is {provider?.accountStatus || "Unknown"}. If
          this account has problems, you can report this ID.
        </p>

        <div className="flex gap-3 justify-end">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition border border-gray-300">
            Report
          </button>
          <button
            onClick={() =>
              handleStatusChange(
                provider?.accountStatus === "ACTIVE" ? "BLOCK" : "ACTIVE"
              )
            }
            disabled={changeLoading}
            className={`px-6 py-2 rounded-md transition ${
              provider?.accountStatus === "ACTIVE"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            } ${
              changeLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {changeLoading
              ? "Processing..."
              : provider?.accountStatus === "ACTIVE"
              ? "Block Provider"
              : "Activate Provider"}
          </button>
        </div>
      </div>

      {/* Message Modal */}
      <Modal
        title={`Send Message to ${provider?.fullName || "Provider"}`}
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
            className={message.trim() ? "bg-primary" : ""}
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

export default Vendor;
