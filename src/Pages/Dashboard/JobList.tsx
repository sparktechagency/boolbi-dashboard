import { Spin, Table, Tag, Tooltip, Image } from "antd";
import { useGetAllJobPostsQuery } from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";

const JobList = () => {
  const { data: allJobPosts, isLoading } = useGetAllJobPostsQuery(undefined);

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
      width: 90,
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
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "-",
      width: 200,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => (
        <div className="flex gap-2 flex-wrap">
          <Tag color={record?.isOfferApproved ? "green" : "default"}>
            {record?.isOfferApproved ? "Offer Approved" : "Offer Pending"}
          </Tag>
          <Tag color={record?.isPaid ? "blue" : "default"}>
            {record?.isPaid ? "Paid" : "Unpaid"}
          </Tag>
          <Tag color={record?.isOnProject ? "geekblue" : "default"}>
            {record?.isOnProject ? "On Project" : "Not Started"}
          </Tag>
        </div>
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
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "-",
      width: 200,
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
