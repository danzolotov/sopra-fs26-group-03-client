"use client";

import React from "react";
import { Typography } from "antd";
import DashboardShell from "@/components/dashboard-shell";

const { Title } = Typography;

const Dashboard: React.FC = () => {

	return (
		<DashboardShell headerTitle="Meal Plan" selectedMenuKey="5">
			<div style={{ marginBottom: "32px" }}>
				<Title level={2} style={{ margin: 0, color: "#0f172a" }}>
					Meal Plan
				</Title>
			</div>

			<div className="dashboard-grid">{/* Meal planning content goes here. */}</div>
		</DashboardShell>
	);
};

export default Dashboard;
