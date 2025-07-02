import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice"; // Your RTK Query hook for forgot password
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation(); // RTK Query hook

  const onFinish = async (values) => {
    try {
      // Trigger the RTK Query mutation with the email value
      const response = await forgotPassword({ email: values.email }).unwrap();

      // If the response is successful, navigate to the OTP page with email
      if (response?.success) {
        toast.success(response?.message || "OTP sent successfully!");
        navigate(`/auth/verify-otp?email=${values.email}`);
      } else {
        // Handle failure, display error message if needed
        console.error("Failed to send OTP:", response?.message);
      }
    } catch (error) {
      // Handle RTK Query mutation error
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
        <p className="w-[90%] mx-auto text-base">
          Enter your email below to reset your password
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<p>Email</p>}
          name="email"
          id="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 45,
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
            }}
            className="flex items-center justify-center bg-primary text-white rounded-lg"
          >
            Send OTP
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
