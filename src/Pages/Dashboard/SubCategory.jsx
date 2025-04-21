import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const SubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Dummy data for main categories
  const mainCategories = [
    { value: "1", label: "Web Development" },
    { value: "2", label: "Mobile Development" },
    { value: "3", label: "UI/UX Design" },
  ];

  // Dummy data for subcategories
  const subCategories = [
    { key: "1", name: "React Development", category: "Web Development" },
    { key: "2", name: "Vue Development", category: "Web Development" },
    { key: "3", name: "iOS Development", category: "Mobile Development" },
    { key: "4", name: "Figma Design", category: "UI/UX Design" },
  ];

  const columns = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (_, record, index) => String(index + 1).padStart(2, "0"),
    },
    {
      title: "Sub Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Main Category",
      dataIndex: "category",
      key: "category",
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

  const handleAddSubCategory = (values) => {
    console.log("New subcategory:", values);
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sub Categories</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#63666A] hover:bg-[#63666A]/80 py-5"
        >
          Add Sub Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={subCategories}
        className="custom-table"
      />

      <Modal
        title="Add New Sub Category"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSubCategory}
          className="mt-4"
        >
          <Form.Item
            name="categoryId"
            label="Select Main Category"
            rules={[
              {
                required: true,
                message: "Please select a main category!",
              },
            ]}
          >
            <Select placeholder="Select a category" options={mainCategories} />
          </Form.Item>

          <Form.Item
            name="subCategoryName"
            label="Sub Category Name"
            rules={[
              {
                required: true,
                message: "Please input sub category name!",
              },
            ]}
          >
            <Input placeholder="Enter sub category name" />
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

export default SubCategory;
