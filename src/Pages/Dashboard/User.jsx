import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const User = () => {
  // Fake user data
  const [userData] = useState({
    name: "Md Kamran Khan",
    email: "Kamran.Uiux@Gmail.Com",
    phone: "01333327633",
    country: "Germany",
    location: "Berlin Germany",
    role: "UX/UI Designer",
    profileImage: "https://i.ibb.co/7N8RMSsc/Screenshot-2025-05-17-091115.png", // Replace with actual image URL
    status: "starting a new profile",
  });

  // Current user viewing the profile
  const currentUser = {
    name: "Wolfgang Spreeberg",
  };

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
    // Here you would typically send the message to an API
    console.log(`Sending message to ${userData.name}: ${message}`);
    // Reset message and close modal
    setMessage("");
    setIsModalOpen(false);
  };

  return (
    <div className="user-profile-container p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentUser.name}
        </h2>
        <Button type="primary" className="bg-primary py-5" onClick={showModal}>
          Send Message
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">{userData.role}</p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name:</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email:</p>
              <p className="font-medium">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone:</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Country:</p>
              <p className="font-medium">{userData.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Location:</p>
              <p className="font-medium">{userData.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">
          Hello, this Employer is {userData.status}. If this accounts have
          problem, You can report this id.
        </p>

        <div className="flex gap-3 justify-end">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            Hold
          </button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Block
          </button>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={`Send Message to ${userData.name}`}
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
