import React, { useState, useEffect } from "react";
import { Button, Form, Input, Spin } from "antd";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  useFetchAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useUpdateProfileImageMutation,
} from "../../../redux/apiSlices/authSlice";
import logo from "../../../assets/randomProfile2.jpg";
import toast from "react-hot-toast";
import rentMeLogo from "../../../assets/navLogo.png";
import { imageUrl } from "../../../redux/api/baseApi";

const PersonalInfo = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState("");
  const [form] = Form.useForm();

  const { data: fetchAdminProfile, isLoading } = useFetchAdminProfileQuery();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();

  const adminData = fetchAdminProfile?.data;

  useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        name: adminData?.fullName,
        email: adminData?.email,
        address: adminData?.address,
        phone: adminData?.phone,
      });
      setImgURL(`${adminData?.profileImage}`);
      setContact(adminData?.contact);
    }
  }, [form, adminData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.name);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("phone", values.phone);

      // Handle image upload separately if there's a new file
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("fildName", "profileImage");
        imageFormData.append("image", file);

        const imageResponse = await updateProfileImage(imageFormData);
        if (imageResponse.error) {
          toast.error(
            imageResponse.error?.data?.message ||
              "Failed to update profile image"
          );
          return;
        }
      }

      const response = await updateAdminProfile(formData);

      if (response.data) {
        toast.success(
          response?.data?.message || "Profile updated successfully"
        );
        setFile(null); // Reset file after successful update
      } else if (response.error) {
        toast.error(
          response.error?.data?.message || "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Link to="/" className="flex items-center gap-[2px] text-base rounded-lg">
        <span>
          <BiLeftArrowAlt size={22} />
        </span>
        <span>Back</span>
      </Link>
      <div className="flex bg-white p-10 mt-10 rounded-2xl border gap-10 w-full">
        <div className="w-8/12">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: "email", message: "Please enter a valid email" },
                { required: true, message: "Please enter your email" },
              ]}
            >
              <Input readOnly className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your Address" }]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Contact"
              rules={[{ required: true, message: "Please enter your Contact" }]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                block
                style={{
                  width: 178,
                  height: 48,
                  fontWeight: "400px",
                  background: "#63666A",
                  color: "white",
                }}
                className="roboto-medium mt-10 text-sm leading-4 hover:bg-primary/80"
              >
                Save and Change
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div className="flex flex-col items-center gap-10 bg-slate-100 px-20 py-12 rounded-xl justify-center">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  imgURL
                    ? imgURL?.startsWith("http") || imgURL?.startsWith("blob:")
                      ? imgURL
                      : `${imageUrl}${imgURL}`
                    : logo
                })`,
              }}
            >
              <div className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate
                  size={22}
                  className="text-primary"
                />
              </div>
            </label>
            <div className="text-center">
              <h1>Profile</h1>
              <h1 className="text-xl">Admin</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
