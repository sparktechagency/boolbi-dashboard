import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const Users = () => {
  const [pageSize, setPageSize] = useState(10);

  const data = [
    {
      serialNo: "01",
      customerName: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Active",
    },
    {
      serialNo: "02",
      customerName: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Block",
    },
    {
      serialNo: "03",
      customerName: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Report",
    },
    // ... add more data as needed
  ];

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
      render: () => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="text-gray-600 hover:text-gray-800"
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
    </div>
  );
};

export default Users;
