import { IoShieldCheckmark } from "react-icons/io5";
import {
  useGetAllVerificationRequestsQuery,
  useUpdateVerificationStatusMutation,
} from "../../redux/apiSlices/userSlice";
import { Image, Spin, Table, Tag, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { imageUrl } from "../../redux/api/baseApi";
import { FaFilePdf } from "react-icons/fa6";
import toast from "react-hot-toast";

const VerificationRequests = () => {
  const {
    data: getAllVerificationRequest,
    isLoading,
    refetch,
  } = useGetAllVerificationRequestsQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateVerificationStatusMutation();

  const handleUpdateStatus = async (requestId, action) => {
    try {
      const res = await updateStatus({ requestId, acction: action }).unwrap();
      if (res.success) {
        toast.success(res?.message || "Status updated successfully");
        refetch();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      const errMsg = error?.data?.message || "Failed to update status";
      toast.error(errMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const verificationList = getAllVerificationRequest?.data?.data || [];

  const statusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "gold";
      case "approved":
      case "verified":
        return "green";
      case "rejected":
        return "red";
      default:
        return "blue";
    }
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (serialNo, record, index) => index + 1,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={`${imageUrl}${record.user.profileImage}`}
            alt="Profile"
            className=" rounded-md object-cover"
          />
          <span className="font-medium">{record.user.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => record.user.email || "-",
    },
    {
      title: "Document",
      dataIndex: "doc",
      key: "doc",
      render: (doc) =>
        doc ? (
          <a
            href={`${imageUrl}${doc}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf size={30} />
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Images",
      dataIndex: "image",
      key: "image",
      render: (images) => {
        const list = Array.isArray(images) ? images : [];
        if (!list.length) return "No image";
        return (
          <div className="flex items-center gap-3 flex-wrap">
            {list.map((image) => (
              <Image
                width={40}
                height={40}
                key={image}
                src={`${imageUrl}${image}`}
                alt="Verification Document"
                className="object-cover rounded-md"
              />
            ))}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColor(status)}>{status}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const isPending = (record.status || "").toLowerCase() === "pending";
        const disableActions = !isPending || isUpdating;
        return (
          <div className="flex items-center gap-2">
            <Popconfirm
              title="Are you sure to approve the request?"
              okText="Yes"
              cancelText="No"
              disabled={disableActions}
              okButtonProps={{ loading: isUpdating }}
              onConfirm={() => handleUpdateStatus(record._id, "APPROVE")}
            >
              <button
                disabled={disableActions}
                className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  disableActions
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105"
                }`}
              >
                {isUpdating ? "Processing..." : "Approve"}
              </button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to decline the request?"
              okText="Yes"
              cancelText="No"
              disabled={disableActions}
              okButtonProps={{ loading: isUpdating }}
              onConfirm={() => handleUpdateStatus(record._id, "DECLINE")}
            >
              <button
                disabled={disableActions}
                className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  disableActions
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105"
                }`}
              >
                {isUpdating ? "Processing..." : "Reject"}
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex text-2xl mb-10 my-10 font-semibold items-center gap-2">
        <IoShieldCheckmark size={24} />
        <h2>Verification Requests</h2>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={verificationList}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default VerificationRequests;
