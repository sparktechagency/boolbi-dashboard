import { useState } from "react";
import {
  Table,
  Input,
  Tooltip,
  Modal,
  InputNumber,
  Button,
  Form,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { usePaymentHistoryQuery } from "../../redux/apiSlices/dashboardSlice";
import {
  useGetAdminCommissionQuery,
  useUpdateAdminCommissionMutation,
} from "../../redux/apiSlices/orderSlice";

const OurTransactions = () => {
  const [commission, setCommission] = useState(5);
  const [isCommissionModalOpen, setCommissionModalOpen] = useState(false);
  const [tempCommission, setTempCommission] = useState(commission);
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
  const {
    data: getAdminCommission,
    isLoading: isLoadingAdminCommission,
    refetch: refetchAdminCommission,
  } = useGetAdminCommissionQuery();

  const [updateAdminCommission, { isLoading: isUpdatingAdminCommission }] =
    useUpdateAdminCommissionMutation();

  // Extract data from API response
  const tableData = paymentHistory?.data?.data || [];
  const totalRecords = paymentHistory?.data?.total || 0;
  const adminCommission = getAdminCommission?.data || 0;

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
        return <p>${Number(profit || 0).toFixed(2)}</p>;
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

  const handleSaveCommission = async () => {
    try {
      const payload = {
        adminCommissionPercentage: Number(tempCommission) || 0,
      };
      const res = await updateAdminCommission(payload).unwrap();
      message.success(
        res?.message || "Default commission updated successfully"
      );
      setCommissionModalOpen(false);
      refetchAdminCommission();
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to update default commission percentage"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Allow Custom Commission</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Default Commission</span>
            <span className="text-gray-700 text-2xl font-bold">
              {adminCommission}%
            </span>
          </div>
          <Button
            type="primary"
            onClick={() => {
              setTempCommission(Number(adminCommission) || 0);
              setCommissionModalOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="flex justify-end items-center mb-6">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search..."
          className="max-w-xs rounded-lg"
        />
      </div>
      <Modal
        title="Edit Default Commission"
        open={isCommissionModalOpen}
        onCancel={() => setCommissionModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setCommissionModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={isUpdatingAdminCommission}
            onClick={handleSaveCommission}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Commission Percentage" required>
            <InputNumber
              min={0}
              max={100}
              value={tempCommission}
              onChange={(val) => setTempCommission(val ?? 0)}
              addonAfter="%"
              className="w-full"
            />
          </Form.Item>
        </Form>
      </Modal>

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
