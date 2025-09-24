import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Spin, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {
  useSubCategoriesQuery,
  useCategoriesQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "../../redux/apiSlices/categorySlice";

const SubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const { data: subCategory, isLoading } = useSubCategoriesQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategoriesQuery();

  const [addSubCategory, { isLoading: isAdding }] = useAddSubCategoryMutation();
  const [updateSubCategory, { isLoading: isUpdating }] =
    useUpdateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();

  if (isLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const subCategories = subCategory?.data || [];
  const categories = categoriesData?.data || [];

  // Format categories for Select component
  const mainCategories = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

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
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        return categoryId?.name || "N/A";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <FaEdit
            size={18}
            className="text-green-500 cursor-pointer hover:text-green-600"
            onClick={() => handleEdit(record)}
          />
          <FaTrash
            size={18}
            className="text-red-500 cursor-pointer hover:text-red-600"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  const handleAddSubCategory = async (values) => {
    try {
      const payload = {
        catagoryID: values.categoryId,
        subCatagoryName: values.subCategoryName,
      };

      if (isEditMode) {
        await updateSubCategory({
          id: editingRecord._id,
          name: values.subCategoryName,
        }).unwrap();
        message.success("Sub category updated successfully!");
      } else {
        await addSubCategory(payload).unwrap();
        message.success("Sub category added successfully!");
      }

      form.resetFields();
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingRecord(null);
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setEditingRecord(record);
    form.setFieldsValue({
      categoryId: record.categoryId?._id,
      subCategoryName: record.name,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this sub category?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteSubCategory(id).unwrap();
          message.success("Sub category deleted successfully!");
        } catch (error) {
          message.error(
            error?.data?.message || "Failed to delete sub category!"
          );
        }
      },
    });
  };

  const handleModalClose = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRecord(null);
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
        rowKey="_id"
        className="custom-table"
        loading={isDeleting}
      />

      <Modal
        title={isEditMode ? "Edit Sub Category" : "Add New Sub Category"}
        open={isModalOpen}
        onCancel={handleModalClose}
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
            <Select
              placeholder="Select a category"
              disabled={isEditMode}
              options={mainCategories}
            />
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
            <Button onClick={handleModalClose} className="mr-2">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isAdding || isUpdating}
              className="bg-[#63666A] hover:bg-[#63666A]/90"
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubCategory;
