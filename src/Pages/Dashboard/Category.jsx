import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Spin, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const { data: allCategory, isLoading } = useCategoriesQuery();
  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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
          className="w-12 h-12 rounded-lg object-cover"
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
          <FaEdit
            size={18}
            className="text-green-500 cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <FaTrash
            size={18}
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  const handleAddCategory = async (values) => {
    try {
      const formData = new FormData();
      formData.append("catagory", values.category);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await addCategory(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Category added successfully");
      } else {
        toast.error(res?.message || "Failed to add category");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add category");
    }

    form.resetFields();
    setFileList([]);
    setIsModalOpen(false);
  };

  const handleUpdateCategory = async (values) => {
    try {
      const formData = new FormData();
      formData.append("id", editingCategory._id);
      formData.append("name", values.category);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await updateCategory(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Category updated successfully");
      } else {
        toast.error(res?.message || "Failed to update category");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update category");
    }

    form.resetFields();
    setFileList([]);
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    // Create preview URLs for new files
    const updatedFileList = newFileList.map((file) => {
      if (file.originFileObj && !file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
      return file;
    });

    setFileList(updatedFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj);
    }

    const src = file.url || file.preview;
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      category: category.name,
    });

    // Set the existing image in fileList if it exists
    if (category.image) {
      const fullImageUrl = category.image.startsWith("http")
        ? category.image
        : `${imageUrl}/${category.image}`;

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: fullImageUrl,
        },
      ]);
    } else {
      setFileList([]);
    }

    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await deleteCategory(categoryId).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Category deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete category");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to delete category");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
    setFileList([]);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingCategory(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
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
        title={editingCategory ? "Edit Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingCategory ? handleUpdateCategory : handleAddCategory}
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

          <Form.Item
            name="image"
            label="Category Image"
            rules={[
              {
                required: !editingCategory,
                message: "Please upload category image!",
              },
            ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
              fileList={fileList}
              onChange={handleUploadChange}
              onPreview={handlePreview}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
            >
              {fileList.length === 0 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Button onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#63666A] hover:bg-[#63666A]/90"
              loading={
                editingCategory ? updateCategoryLoading : addCategoryLoading
              }
            >
              {editingCategory ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
