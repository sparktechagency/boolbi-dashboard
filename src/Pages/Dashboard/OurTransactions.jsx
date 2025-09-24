import React, { useState } from "react";
import { Table, Switch, Input, Space, Spin, Tooltip } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa6";
import { usePaymentHistoryQuery } from "../../redux/apiSlices/dashboardSlice";

const OurTransactions = () => {
  const [commission, setCommission] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: paymentHistory,
    isLoading,
    error,
  } = usePaymentHistoryQuery({
    page: currentPage,
    limit: pageSize,
  });

  // Extract data from API response
  const tableData = paymentHistory?.data?.data || [];
  const totalRecords = paymentHistory?.data?.total || 0;

  // Handle pagination change
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (_, __, index) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Tooltip title={id || "N/A"} placement="top">
          <span>{id?.slice(-8) || "N/A"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Job Name",
      dataIndex: "jobName",
      key: "jobName",
      render: (jobName) => jobName || "N/A",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => {
        return <p>${budget || 0}</p>;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (customerName) => customerName || "N/A",
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => {
        return <p>${profit || 0}</p>;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        let className = "";
        switch (status?.toUpperCase()) {
          case "PENDING":
            className = "bg-[#ffe880] text-[#000000]";
            break;
          case "SUCCESS":
          case "COMPLETED":
            className = "bg-[#18a513] text-white";
            break;
          case "FAILED":
            className = "bg-[#ff4d4f] text-white";
            break;
          default:
            className = "bg-[#E7FFE7] text-[#00B907]";
        }
        return (
          <span className={`px-4 py-1 rounded-md text-sm ${className}`}>
            {status || "Unknown"}
          </span>
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => (
    //     <Space size="middle">
    //       <FaEye size={20} className="text-[#63666A] cursor-pointer" />
    //     </Space>
    //   ),
    // },
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
        dataSource={tableData}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalRecords,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        className="custom-table"
      />
    </div>
  );
};

export default OurTransactions;
