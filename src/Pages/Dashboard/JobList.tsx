import { Spin, Table, Tag, Tooltip, Image, Space } from "antd";
import {
  useChangeJobStatusMutation,
  useGetAllJobPostsQuery,
} from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const JobList = () => {
  const { data: allJobPosts, isLoading } = useGetAllJobPostsQuery(undefined);
  const [changeJobStatus] = useChangeJobStatusMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const jobPosts = allJobPosts?.data?.data || [];

  const columns = [
    {
      title: "Serial No",
      key: "serial",
      render: (_: any, __: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (name: string) => name || "N/A",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 140,
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (loc: string) => (
        <Tooltip title={loc || "-"}>
          <span>
            {loc ? (loc.length > 30 ? `${loc.slice(0, 30)}…` : loc) : "-"}
          </span>
        </Tooltip>
      ),
    },

    {
      title: "Offers",
      dataIndex: "offers",
      key: "offers",
      render: (offers: string[]) => offers?.length ?? 0,
      width: 100,
    },
    {
      title: "Cover",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (src: string) =>
        src ? (
          <Image
            src={`${imageUrl}${src}`}
            alt="Cover"
            width={60}
            height={40}
            className="object-cover rounded"
          />
        ) : (
          "-"
        ),
      width: 100,
    },
    {
      title: "Commission %",
      dataIndex: "adminCommissionPercentage",
      key: "adminCommissionPercentage",
      render: (val: number) => (val !== undefined ? `${val}%` : "-"),
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? "red" : "green"}>
          {isBlocked ? "Blocked" : "Active"}
        </Tag>
      ),
      width: 100,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "-",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/jobs-list/${record._id}`}>
            <FaEye
              size={20}
              className="text-[#63666A] cursor-pointer hover:text-[#85acd3]"
            />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Jobs List</h2>
      <Table
        columns={columns as any}
        dataSource={jobPosts}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default JobList;
