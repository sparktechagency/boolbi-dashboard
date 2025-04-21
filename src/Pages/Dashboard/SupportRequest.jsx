import React from "react";
import { Table, Select } from "antd";

const SupportRequest = () => {
  const data = [
    {
      serialNo: "01",
      userName: "Ebrahim",
      email: "Ebrahim@Gmail.Com",
      problemCategory: "System Problem",
      status: "Pending",
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
    </div>
  );
};

export default SupportRequest;
