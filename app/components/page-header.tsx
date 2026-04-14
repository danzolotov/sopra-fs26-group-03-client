"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

interface PageHeaderProps {
	title: string;
}

interface GroupMeResponse {
	id?: number;
	name?: string;
	inviteCode?: string;
	createdAt?: string;
	members?: unknown[];
}

export default function PageHeader({ title }: PageHeaderProps) {
	const apiService = useApi();
	const router = useRouter();
	const [yourGroup, setYourGroup] = useState<string>("Loading...");
	const [hasGroup, setHasGroup] = useState(false);

	useEffect(() => {
		const fetchGroup = async () => {
			try {
				const group = await apiService.get<GroupMeResponse>("/groups/me");
				const groupName = group.name?.trim();
				if (groupName) {
					setYourGroup(groupName);
					setHasGroup(true);
				} else {
					setYourGroup("Join Group");
					setHasGroup(false);
				}
			} catch (error) {
				console.error("Could not fetch current group", error);
				setYourGroup("Join Group");
				setHasGroup(false);
			}
		};

		fetchGroup();
	}, [apiService]);

	return (
		<header className="border-b border-gray-200 bg-white">
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
						<Image alt="PlateMate logo" height={20} src="/favicon.svg" width={20} />
					</div>
					<div>
						<div className="text-xl font-semibold text-slate-900">PlateMate</div>
						<p className="text-xs text-slate-500">{title}</p>
					</div>
				</div>
				<button
					className="pm-button flex items-center gap-3"
					onClick={() => router.push(hasGroup ? "/groups/me" : "/groups")}
					type="button"
				>
					{yourGroup}
				</button>
			</div>
		</header>
	);
}
