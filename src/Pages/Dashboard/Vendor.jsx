import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

const Vendor = () => {
  // Fake vendor data
  const [vendorData] = useState({
    name: "Md Kamran Khan",
    email: "Kamran.Uiux@Gmail.Com",
    phone: "01333327633",
    country: "Germany",
    location: "Berlin Germany",
    role: "UX/UI Designer",
    profileImage: "https://i.ibb.co/7N8RMSsc/Screenshot-2025-05-17-091115.png",
    status: "starting a new profile",
    companyCategory: "Software Company",
    companyName: "Brothers Limited Company",
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Handle modal open/close
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle message submission
  const handleSendMessage = () => {
    console.log(`Sending message to ${vendorData.name}: ${message}`);
    setMessage("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          About Service Providers
        </h2>
        <Button type="primary" className="bg-primary py-5" onClick={showModal}>
          Send Message
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                  <img
                    src={vendorData.profileImage}
                    alt={vendorData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600">{vendorData.role}</p>
              </div>

              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Name:</p>
                  <p className="font-medium">{vendorData.name}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="font-medium">{vendorData.email}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Phone:</p>
                  <p className="font-medium">{vendorData.phone}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Country:</p>
                  <p className="font-medium">{vendorData.country}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Location:</p>
                  <p className="font-medium">{vendorData.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Company Category:</p>
              <p className="font-medium">{vendorData.companyCategory}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Company Name:</p>
              <p className="font-medium">{vendorData.companyName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">
          Hello, this Employer is {vendorData.status}. If this accounts have
          problem, You can report this id.
        </p>

        <div className="flex gap-3 justify-end">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition border border-gray-300">
            Report
          </button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Block
          </button>
        </div>
      </div>

      {/* Message Modal */}
      <Modal
        title={`Send Message to ${vendorData.name}`}
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
