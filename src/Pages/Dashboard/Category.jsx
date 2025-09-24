import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
} from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: allCategory, isLoading } = useCategoriesQuery();
  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const categories = allCategory?.data || [];

  const columns = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (_, record, index) => String(index + 1).padStart(2, "0"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img
          src={image?.startsWith("http") ? image : `${imageUrl}/${image}`}
          alt={record.name}
          className="w-12 h-12 rounded-lg"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <FaEdit size={18} className="text-green-500 cursor-pointer" />
          <FaTrash size={18} className="text-red-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  const handleAddCategory = async (values) => {
    try {
      const res = await addCategory(values).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Category added successfully");
      } else {
        toast.error(res?.message || "Failed to add category");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add category");
    }

    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#63666A] hover:bg-[#63666A]/80 py-5"
        >
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        className="custom-table"
      />

      <Modal
        title="Add New Category"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCategory}
          className="mt-4"
        >
          <Form.Item
            name="category"
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#63666A] hover:bg-[#63666A]/90"
            >
              {addCategoryLoading ? "Loading..." : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
