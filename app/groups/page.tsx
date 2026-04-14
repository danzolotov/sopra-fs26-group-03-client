"use client";

import React, { useState } from "react";
import { Alert, Button, Card, Form, Input } from "antd";
import { useApi } from "@/hooks/useApi";
import PageHeader from "@/components/page-header";

interface CreateGroupFormValues {
	name: string;
}

interface GroupGetDTO {
	id?: number;
	name?: string;
	inviteCode?: string;
}

const GroupsPage: React.FC = () => {
	const apiService = useApi();
	const [form] = Form.useForm<CreateGroupFormValues>();
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCreateGroup = async (values: CreateGroupFormValues) => {
		setErrorMessage("");
		setSuccessMessage("");
		setIsSubmitting(true);

		try {
			const createdGroup = await apiService.post<GroupGetDTO>("/groups", {
				name: values.name,
			});

			setSuccessMessage(`Group \"${createdGroup.name ?? values.name}\" was created.`);
			form.resetFields();
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("An unknown error occurred while creating the group.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white">
			<PageHeader title="Groups" />
			<div className="flex flex-1 items-center justify-center px-4 py-8">
				<Card className="w-full max-w-md rounded-[2rem] border border-primary-500/20 bg-white/90 shadow-xl backdrop-blur">
					<h1 className="mb-1 text-2xl font-semibold text-primary-600">Create a group</h1>
					<p className="mb-6 text-sm text-slate-500">Enter a name and create your group.</p>

					{successMessage ? <Alert className="mb-4" message={successMessage} showIcon type="success" /> : null}
					{errorMessage ? <Alert className="mb-4" message={errorMessage} showIcon type="error" /> : null}

					<Form form={form} layout="vertical" name="create-group" onFinish={handleCreateGroup}>
						<Form.Item
							label="Group name"
							name="name"
							rules={[
								{ required: true, message: "Please enter a group name." },
								{ min: 2, message: "Group name must be at least 2 characters." },
							]}
						>
							<Input placeholder="My awesome group" />
						</Form.Item>

						<Form.Item className="mb-0">
							<Button className="login-button !h-11 !font-semibold" htmlType="submit" loading={isSubmitting} type="primary">
								Create group
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default GroupsPage;
