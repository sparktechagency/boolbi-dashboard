import React, { useState } from "react";
import { Table, Switch, Input, Space } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa6";
import { render } from "react-dom";

const OurTransactions = () => {
  const [commission, setCommission] = useState(5);

  const data = [
    {
      serialNo: "01",
      jobName: "Create iOS App",
      budget: "310",
      companyName: "Withdrawal Limited Company",
      payment: "Pending",
    },
    {
      serialNo: "01",
      jobName: "Create iOS App",
      budget: "310",
      companyName: "Withdrawal Limited Company",
      payment: "Paid",
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
      title: "Job Name",
      dataIndex: "jobName",
      key: "jobName",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => {
        return <p>${budget}</p>;
      },
    },
    {
      title: "Company/Customer Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (_, record) => {
        return <p>${(record.budget * 5) / 100}</p>;
      },
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (status) => {
        let className = "";
        switch (status) {
          case "Pending":
            className = "bg-[#ffe880] text-[#000000]";
            break;
          case "Paid":
            className = "bg-[#18a513] text-white";
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
      render: () => (
        <Space size="middle">
          <FaEye size={20} className="text-[#63666A] cursor-pointer" />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Allow Custom Commission</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Default Commission</span>
          <div className="flex items-center gap-2">
            <Switch defaultChecked size="small" />
            <span>{commission}%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mb-6">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search..."
          className="max-w-xs rounded-lg"
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="custom-table"
      />
    </div>
  );
};

export default OurTransactions;
