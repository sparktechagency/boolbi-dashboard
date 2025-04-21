import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Dummy data for categories
  const categories = [
    { key: "1", name: "UX/UI Designer" },
    { key: "2", name: "Web Developer" },
    { key: "3", name: "Mobile App Developer" },
    { key: "4", name: "Graphic Designer" },
  ];

  const columns = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (_, record, index) => String(index + 1).padStart(2, "0"),
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
          <FaEye size={18} className="text-blue-500 cursor-pointer" />
          <FaEdit size={18} className="text-green-500 cursor-pointer" />
          <FaTrash size={18} className="text-red-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  const handleAddCategory = (values) => {
    console.log("New category:", values);
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
            name="categoryName"
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
