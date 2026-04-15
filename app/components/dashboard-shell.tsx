"use client";

import React from "react";
import {
	AppstoreOutlined,
	CalendarOutlined,
	FileTextOutlined,
	ReadOutlined,
	ShoppingOutlined,
} from "@ant-design/icons";
import { Calendar, Card, Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/page-header";

const { Content, Sider } = Layout;
const { Title } = Typography;

interface DashboardShellProps {
	headerTitle: string;
	selectedMenuKey: string;
	children: React.ReactNode;
}

const menuRoutes: Record<string, string> = {
	"1": "/dashboard",
	"2": "/pantry",
	"3": "/shopping-lists",
	"4": "/recipes",
	"5": "/meal-plan",
};

const menuItems: MenuProps["items"] = [
	{ key: "1", icon: <AppstoreOutlined />, label: "Dashboard" },
	{ key: "2", icon: <ShoppingOutlined />, label: "Pantry" },
	{ key: "3", icon: <FileTextOutlined />, label: "Shopping List" },
	{ key: "4", icon: <ReadOutlined />, label: "Recipes" },
	{ key: "5", icon: <CalendarOutlined />, label: "Meal Plan" },
];

export default function DashboardShell({ headerTitle, selectedMenuKey, children }: DashboardShellProps) {
	const router = useRouter();

	const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
		const route = menuRoutes[key];
		if (route) {
			router.push(route);
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white">
			<PageHeader title={headerTitle} />
			<Layout className="flex-1 bg-transparent" style={{ background: "transparent" }}>
				<Sider
					width={300}
					theme="light"
					style={{
						borderRight: "1px solid #fed7aa",
						padding: "20px 10px",
						background: "#fff7ed",
					}}
				>
					<div style={{ marginBottom: "20px", textAlign: "center" }}>
						<Title level={3} style={{ color: "#c2410c", marginBottom: 0 }}>
							PlateMate
						</Title>
					</div>

					<Menu
						mode="inline"
						selectedKeys={[selectedMenuKey]}
						onClick={handleMenuClick}
						style={{ borderRight: 0 }}
						items={menuItems}
						className="dashboard-sidebar-menu"
					/>

					<div style={{ marginTop: "40px", padding: "0 10px" }}>
						<Card size="small" className="dashboard-mini-calendar">
							<Calendar fullscreen={false} headerRender={() => null} />
						</Card>
					</div>
				</Sider>

				<Content style={{ padding: "40px" }}>{children}</Content>
			</Layout>
		</div>
	);
}

