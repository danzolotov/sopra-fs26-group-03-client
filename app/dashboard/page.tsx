"use client";

import React from "react";
import { Layout, Menu, Typography, Calendar, Card, Badge } from "antd";
import {
	AppstoreOutlined,
	ShoppingOutlined,
	FileTextOutlined,
	ReadOutlined,
	CalendarOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
	// Replace with actual user logic later
	const userName = "Name";

	return (
		<Layout style={{ minHeight: "80vh", background: "#f5f5f5" }}>
			{/* LEFT PANEL */}
			<Sider
				width={300}
				theme="light"
				style={{
					borderRight: "1px solid #e8e8e8",
					padding: "20px 10px",
					background: "#bfbfbf",
				}}
			>
				<div style={{ marginBottom: "20px", textAlign: "center" }}>
					<Title level={3}>PlateMate</Title>
				</div>

				<Menu
					mode="inline"
					defaultSelectedKeys={["1"]}
					style={{ borderRight: 0 }}
					items={[
						{ key: "1", icon: <AppstoreOutlined />, label: "Dashboard" },
						{ key: "2", icon: <ShoppingOutlined />, label: "Pantry" },
						{ key: "3", icon: <FileTextOutlined />, label: "Shopping List" },
						{ key: "4", icon: <ReadOutlined />, label: "Recipes" },
						{ key: "5", icon: <CalendarOutlined />, label: "Meal Plan" },
					]}
					// Using CSS to get those rounded buttons from your image
					className="sidebar-menu"
				/>

				{/* CALENDAR MINI-VIEW */}
				<div style={{ marginTop: "40px", padding: "0 10px," }}>
					<Card size="small" className="platemate-mini-calendar">
						<Calendar fullscreen={false} headerRender={() => null} />
					</Card>
				</div>
			</Sider>

			{/* MAIN CONTENT AREA */}
			<Content style={{ padding: "40px" }}>
				{/* WELCOME TEXT */}
				<div style={{ marginBottom: "32px" }}>
					<Title level={2} style={{ margin: 0, color: "black" }}>
						Good morning, {userName}
					</Title>
				</div>

				{/* REST OF DASHBOARD GOES HERE */}
				<div className="dashboard-grid">{/* Quick Actions, Upcoming, etc. */}</div>
			</Content>
		</Layout>
	);
};

export default Dashboard;
