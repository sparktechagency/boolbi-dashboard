import React, { useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import { FaEye } from "react-icons/fa6";

const Users = () => {
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    {
      serialNo: "01",
      customerName: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Active",
      email: "Kamran.Uliya@Gmail.Com",
      phone: "01333327633",
      country: "Germany",
      location: "Berlin Germany",
      profileImg: "https://i.ibb.co.com/Z6nyF6q/mukesh-Ambani.jpg",
    },
    {
      serialNo: "02",
      customerName: "Mithila Khan",
      category: "Frontend Developer",
      status: "Active",
      email: "mithuu@gmail.com",
      phone: "01111111111",
      country: "Bangladesh",
      location: "Chittagong Road, Narayanganj",
      profileImg: "https://i.ibb.co.com/GfNydhRW/random-Profile-Image.jpg",
    },
    {
      serialNo: "03",
      customerName: "Alex Chen",
      category: "Full Stack Developer",
      status: "Report",
      email: "alex.chen@gmail.com",
      phone: "01555549855",
      country: "Canada",
      location: "Toronto, Canada",
      profileImg: "https://i.ibb.co.com/Z6nyF6q/mukesh-Ambani.jpg",
    },
  ];

  const showUserDetails = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let className = "";
        switch (status) {
          case "Active":
            className = "bg-green-500 text-white";
            break;
          case "Block":
            className = "bg-red-500 text-white";
            break;
          case "Report":
            className = "bg-gray-500 text-white";
            break;
          default:
            className = "bg-gray-500 text-white";
        }
        return (
          <span className={`px-4 py-1 rounded-full text-sm ${className}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <FaEye
          size={18}
          className="text-blue-500 cursor-pointer"
          onClick={() => showUserDetails(record)}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Total Customer List</h2>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize }}
        className="custom-table"
      />

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
      >
        {selectedUser && (
          <div className="text-center">
            <div className="mb-6">
              <img
                src={selectedUser.profileImg || "https://placeholder.com/150"}
                alt={selectedUser.customerName}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-lg font-medium">{selectedUser.category}</p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="text-gray-600 mb-1">Name:</p>
                <p className="font-medium">{selectedUser.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Email:</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Phone:</p>
                <p className="font-medium">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Country:</p>
                <p className="font-medium">{selectedUser.country}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Location:</p>
                <p className="font-medium">{selectedUser.location}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;
