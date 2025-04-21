import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const Vendors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const data = [
    {
      serialNo: "01",
      serviceProvider: "Md Kamran Khan",
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
      serviceProvider: "Sam Johnson",
      category: "Frontend Developer",
      status: "Block",
      email: "sam.j@gmail.com",
      phone: "01444438744",
      country: "United States",
      location: "New York City",
      profileImg: "https://i.ibb.co.com/Z6nyF6q/mukesh-Ambani.jpg",
    },
    {
      serialNo: "03",
      serviceProvider: "Ahmed Hassan",
      category: "Backend Developer",
      status: "Report",
      email: "ahmed.h@gmail.com",
      phone: "01555549855",
      country: "UAE",
      location: "Dubai",
      profileImg: "https://i.ibb.co.com/Z6nyF6q/mukesh-Ambani.jpg",
    },
    // Add more data as needed
  ];

  const showProviderDetails = (record) => {
    setSelectedProvider(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Service Providers",
      dataIndex: "serviceProvider",
      key: "serviceProvider",
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
            className = "bg-[#E7FFE7] text-[#00B907]";
            break;
          case "Block":
            className = "bg-[#FFE7E7] text-[#FF0000]";
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
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="text-[#63666A]"
          onClick={() => showProviderDetails(record)}
        />
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
        dataSource={data}
        pagination={{ pageSize: 10 }}
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
