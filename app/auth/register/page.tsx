"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // use NextJS router for navigation
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/user";
import { Button, Card, Form, Input, App } from "antd";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { notification } = App.useApp();
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      await apiService.post<User>("/auth/register", values);
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred during registration.";
      notification.error({
        message: "Registration Failed",
        description: message,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4 py-6">
      <Card className="w-full max-w-md rounded-[2rem] border border-primary-500/20 bg-white/90 shadow-xl backdrop-blur">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-primary-600">
            Create account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign up to start using PlateMate.
          </p>
        </div>
        <Form
          form={form}
          name="register"
          size="large"
          variant="outlined"
          className="register-form"
          onFinish={handleRegister}
          layout="vertical"
        >
          <Form.Item
            name="username"
            // label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            // label="E-mail"
            rules={[
              { required: true, message: "Please input your e-mail!" },
              {
                pattern: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*./,
                message: "Invalid email format!",
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger="onChange"
            // label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              { pattern: /[a-z]/, message: "At least one lowercase letter!" },
              { pattern: /[A-Z]/, message: "At least one uppercase letter!" },
              { pattern: /\d/, message: "At least one number!" },
              {
                pattern: /[@$!%*?&.]/,
                message: "At least one special character!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className="register-button pm-button-primary w-full !h-11 !font-semibold"
            >
              Sign Up
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
};

export default Register;
