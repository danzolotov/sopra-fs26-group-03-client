"use client";

import React from "react";
import { Typography } from "antd";
import DashboardShell from "@/components/dashboard-shell";

const { Title } = Typography;

const Dashboard: React.FC = () => {
	const userName = "Name";

	return (
		<DashboardShell headerTitle="Dashboard" selectedMenuKey="1">
			<div style={{ marginBottom: "32px" }}>
				<Title level={2} style={{ margin: 0, color: "#0f172a" }}>
					Good morning, {userName}
				</Title>
			</div>

			<div className="dashboard-grid">{/* Quick Actions, Upcoming, etc. */}</div>
		</DashboardShell>
	);
};

export default Dashboard;
