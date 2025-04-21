import React from "react";
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const Vendors = () => {
  const data = [
    {
      serialNo: "01",
      serviceProvider: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Active",
    },
    {
      serialNo: "02",
      serviceProvider: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Block",
    },
    {
      serialNo: "03",
      serviceProvider: "Md Kamran Khan",
      category: "UX/UI Designer",
      status: "Report",
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
      render: () => (
        <Button type="text" icon={<EyeOutlined />} className="text-[#63666A]" />
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
    </div>
  );
};

export default Vendors;
