"use client";

import React from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
  LeftOutlined,
  ReadOutlined,
  RightOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import PageHeader from "@/components/page-header";

interface DashboardShellProps {
  headerTitle: string;
  selectedMenuKey: string;
  children: React.ReactNode;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const menuRoutes: Record<string, string> = {
  "1": "/dashboard",
  "2": "/pantry",
  "3": "/shopping-lists",
  "4": "/recipes",
  "5": "/meal-plan",
};

const menuItems: MenuItem[] = [
  { key: "1", icon: <AppstoreOutlined />, label: "Dashboard" },
  { key: "2", icon: <ShoppingOutlined />, label: "Pantry" },
  { key: "3", icon: <FileTextOutlined />, label: "Shopping List" },
  { key: "4", icon: <ReadOutlined />, label: "Recipes" },
  { key: "5", icon: <CalendarOutlined />, label: "Meal Plan" },
];

export default function DashboardShell({
  headerTitle,
  selectedMenuKey,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const api = useApi();
  const [isVerifying, setIsVerifying] = React.useState(true);

  React.useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get("/users/me");
        setIsVerifying(false);
      } catch (error) {
        console.error("Auth verification failed:", error);
        router.push("/auth/login");
      }
    };
    verifyAuth();
  }, [api, router]);



  const handleMenuClick = (key: string) => {
    const route = menuRoutes[key];
    if (route) {
      router.push(route);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white">
      <PageHeader title={headerTitle} />
      <div className="flex flex-1">
        <aside className="w-[300px] border-r border-primary-200 bg-orange-50 px-2.5 py-5">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-semibold text-primary-600">
              PlateMate
            </h2>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => {
              const isActive = item.key === selectedMenuKey;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleMenuClick(item.key)}
                  className={`flex h-11 w-full items-center gap-3 rounded-full border px-4 text-left transition-colors ${
                    isActive
                      ? "border-primary-300 bg-primary-200 font-semibold text-secondary-700"
                      : "border-primary-200 bg-primary-100 text-primary-600 hover:bg-primary-200"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>


        </aside>

        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
