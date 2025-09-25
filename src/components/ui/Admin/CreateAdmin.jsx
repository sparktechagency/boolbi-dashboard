import { Form, Input, Modal, message } from "antd";
import React from "react";
import { useAddNewAdminMutation } from "../../../redux/apiSlices/userSlice";

const CreateAdmin = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [addNewAdmin, { isLoading: isAdding }] = useAddNewAdminMutation();

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const result = await addNewAdmin(values).unwrap();
      message.success("Admin created successfully!");
      handleClose();
    } catch (error) {
      message.error(error?.data?.message || "Failed to create admin");
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      width={500}
      footer={null}
    >
      <div className="p-6 mt-4">
        <h1 className="font-semibold text-[#555555] text-xl mb-3">Add Admin</h1>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter the admin's name" },
            ]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the admin's email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            className="text-[#6D6D6D] py-1"
          >
            <Input.Password className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item className="text-center mt-6">
            <button
              type="submit"
              disabled={isAdding}
              className="bg-primary text-white w-40 h-11 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Creating..." : "Create"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAdmin;
