import React, { useState } from "react";
import { Table, Modal, Spin, Alert } from "antd";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCustomersQuery } from "../../redux/apiSlices/userSlice";

const Users = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: customers,
    isLoading,
    error,
  } = useCustomersQuery({
    page: page,
    limit: pageSize,
  });

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
          description="Failed to fetch customers data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  // Handle different possible response structures
  const userDetails =
    customers?.data?.data || customers?.data || customers || [];
  const totalCount = customers?.data?.total || customers?.total || 0;

  const showUserDetails = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (serialNo, record, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => {
        let className = "";
        switch (status) {
          case "ACTIVE":
            className = "bg-green-500 text-white";
            break;
          case "BLOCKED":
            className = "bg-red-500 text-white";
            break;
          case "REPORTED":
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
        <Link to={`/customers/${record?._id}`}>
          <FaEye
            size={18}
            className="text-blue-500 cursor-pointer"
            onClick={() => showUserDetails(record)}
          />
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Total Customer List</h2>
        <p className="text-gray-600">Total: {totalCount} customers</p>
      </div>

      <Table
        columns={columns}
        dataSource={userDetails}
        rowKey={(record) => record._id || record.id}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalCount,

          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} customers`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            if (newPageSize !== pageSize) {
              setPageSize(newPageSize);
              setPage(1);
            }
          },
        }}
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
                alt={selectedUser.fullName}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-lg font-medium">{selectedUser.category}</p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="text-gray-600 mb-1">Name:</p>
                <p className="font-medium">{selectedUser.fullName}</p>
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
