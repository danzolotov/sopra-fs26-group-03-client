"use client";

import React from "react";
import { Layout, Menu, Typography, Calendar, Card } from "antd";
import { useRouter } from "next/navigation";
import {
	AppstoreOutlined,
	ShoppingOutlined,
	FileTextOutlined,
	ReadOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import PageHeader from "@/components/page-header";

const { Sider, Content } = Layout;
const { Title } = Typography;

const menuRoutes: Record<string, string> = {
	"1": "/dashboard",
	"2": "/groups",
	"3": "/shopping-lists",
	"4": "/recipes",
	"5": "/meal-plan",
};

const Dashboard: React.FC = () => {
	const userName = "Name";
	const router = useRouter();

	const handleMenuClick = ({ key }: { key: string }) => {
		const route = menuRoutes[key];
		if (route) {
			router.push(route);
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white">
			<PageHeader title="Dashboard" />
			<Layout className="flex-1 bg-transparent" style={{ background: "transparent" }}>
				{/* LEFT PANEL */}
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
						defaultSelectedKeys={["1"]}
						onClick={handleMenuClick}
						style={{ borderRight: 0 }}
						items={[
							{ key: "1", icon: <AppstoreOutlined />, label: "Dashboard" },
							{ key: "2", icon: <ShoppingOutlined />, label: "Pantry" },
							{ key: "3", icon: <FileTextOutlined />, label: "Shopping List" },
							{ key: "4", icon: <ReadOutlined />, label: "Recipes" },
							{ key: "5", icon: <CalendarOutlined />, label: "Meal Plan" },
						]}
						// Using CSS to get those rounded buttons from your image
						className="dashboard-sidebar-menu"
					/>

					{/* CALENDAR MINI-VIEW */}
					<div style={{ marginTop: "40px", padding: "0 10px," }}>
						<Card size="small" className="dashboard-mini-calendar">
							<Calendar fullscreen={false} headerRender={() => null} />
						</Card>
					</div>
				</Sider>

				{/* MAIN CONTENT AREA */}
				<Content style={{ padding: "40px" }}>
					{/* WELCOME TEXT */}
					<div style={{ marginBottom: "32px" }}>
						<Title level={2} style={{ margin: 0, color: "#0f172a" }}>
							Good morning, {userName}
						</Title>
					</div>

					{/* REST OF DASHBOARD GOES HERE */}
					<div className="dashboard-grid">{/* Quick Actions, Upcoming, etc. */}</div>
				</Content>
			</Layout>
		</div>
	);
};

export default Dashboard;
