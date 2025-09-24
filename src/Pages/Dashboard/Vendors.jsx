import React, { useState } from "react";
import { Table, Button, Modal, Spin, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllProvidersQuery } from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";

const Vendors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: providers,
    isLoading,
    error,
  } = useGetAllProvidersQuery({
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
          description="Failed to fetch providers data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  // Handle different possible response structures
  const providerDetails =
    providers?.data?.data || providers?.data || providers || [];
  const totalCount = providers?.data?.total || providers?.total || 0;

  const showProviderDetails = (record) => {
    setSelectedProvider(record);
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
      title: "Service Providers",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      render: (status) => {
        let className = "";
        switch (status) {
          case "ACTIVE":
          case "ACTIVE":
            className = "bg-[#E7FFE7] text-[#00B907]";
            break;
          case "BLOCK":
          case "BLOCK":
            className = "bg-[#FFE7E7] text-[#FF0000]";
            break;
          case "PENDING":
          case "Pending":
            className = "bg-[#FFF4E6] text-[#FF8C00]";
            break;
          case "Report":
            className = "bg-[#63666A] text-white";
            break;
          default:
            className = "bg-[#E7FFE7] text-[#00B907]";
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
        <Link to={`/service-provider/${record?._id}`}>
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-[#63666A]"
            onClick={() => showProviderDetails(record)}
          />
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Total Service Provider List</h2>
        <Button className="bg-[#63666A] text-white hover:bg-[#63666A]/90">
          Filter
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={providerDetails}
        rowKey={(record) => record._id || record.id}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} providers`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            if (newPageSize !== pageSize) {
              setPageSize(newPageSize);
              setPage(1); // Reset to first page when page size changes
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
        {selectedProvider && (
          <div className="text-center">
            <div className="mb-6">
              <img
                src={
                  selectedProvider.profileImg || "https://placeholder.com/150"
                }
                alt={selectedProvider.serviceProvider}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-lg font-medium">{selectedProvider.category}</p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="text-gray-600 mb-1">Name:</p>
                <p className="font-medium">
                  {selectedProvider.serviceProvider}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Email:</p>
                <p className="font-medium">{selectedProvider.email}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Phone:</p>
                <p className="font-medium">{selectedProvider.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Country:</p>
                <p className="font-medium">{selectedProvider.country}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Location:</p>
                <p className="font-medium">{selectedProvider.location}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vendors;
