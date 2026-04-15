"use client";

import React from "react";
import { Typography } from "antd";
import DashboardShell from "@/components/dashboard-shell";

const { Title } = Typography;

const Dashboard: React.FC = () => {

	return (
		<DashboardShell headerTitle="Shopping Lists" selectedMenuKey="3">
			<div style={{ marginBottom: "32px" }}>
				<Title level={2} style={{ margin: 0, color: "#0f172a" }}>
					Shopping Lists
				</Title>
			</div>

			<div className="dashboard-grid">{/* Shopping list content goes here. */}</div>
		</DashboardShell>
	);
};

export default Dashboard;
