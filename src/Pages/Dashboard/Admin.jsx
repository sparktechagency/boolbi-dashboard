import { Spin, Table, Modal, message } from "antd";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import CreateAdmin from "../../components/ui/Admin/CreateAdmin";
import Title from "../../components/common/Title";
import { FaTrash } from "react-icons/fa6";
import {
  useAddNewAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../redux/apiSlices/userSlice";

const { confirm } = Modal;

const Admin = () => {
  const [open, setOpen] = useState(false);

  const { data: allAdmins, isLoading } = useGetAllAdminsQuery();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const admins = allAdmins?.data?.data || [];

  const handleDeleteAdmin = (adminId, adminName) => {
    confirm({
      title: 'Delete Admin',
      content: `Are you sure you want to delete admin "${adminName}"? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteAdmin(adminId).unwrap();
          message.success('Admin deleted successfully!');
        } catch (error) {
          message.error(error?.data?.message || 'Failed to delete admin');
        }
      },
    });
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <FaTrash 
          size={18} 
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" 
          onClick={() => handleDeleteAdmin(record._id, record.fullName)}
        />
      ),
    },
  ];
  return (
    <div className="bg-white p-10 h-screen">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <Title className="">Admins</Title>
        <button
          className="bg-primary text-white h-10 px-4 rounded-md"
          onClick={() => {
            setOpen(true);
          }}
        >
          + Add Admin
        </button>
      </div>

      {/* table container */}
      <Table columns={columns} dataSource={admins} pagination={false} />
      <CreateAdmin open={open} setOpen={setOpen} />
    </div>
  );
};

export default Admin;
