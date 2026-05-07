"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // use NextJS router for navigation
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/user";
import { Button, Form, Input, Card, App } from "antd";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { notification } = App.useApp();
  const router = useRouter();
  const apiService = useApi();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await apiService.post<User>("/auth/login", values);
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred during login.";
      notification.error({
        message: "Login Failed",
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
            Welcome back!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Log in to continue to PlateMate.
          </p>
        </div>
        <Form
          form={form}
          name="login"
          size="large"
          variant="outlined"
          className="register-form"
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            className="mb-4"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            className="mb-3"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <a className="forgot-password">Forgot password?</a>
          <Form.Item className="mb-3">
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className="login-button pm-button-primary w-full !h-11 !font-semibold"
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              htmlType="button"
              className="register-button !h-11 !font-semibold"
              onClick={() => router.push("/auth/register")}
            >
              Create account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
