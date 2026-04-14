"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

interface PageHeaderProps {
	title: string;
}

interface GroupMeResponse {
	name?: string;
	groupName?: string;
	group?: string | { name?: string; groupName?: string };
}

function extractGroupLabel(payload: GroupMeResponse): string {
	if (payload.groupName) {
		return payload.groupName;
	}
	if (payload.name) {
		return payload.name;
	}
	if (typeof payload.group === "string") {
		return payload.group;
	}
	if (payload.group?.groupName) {
		return payload.group.groupName;
	}
	if (payload.group?.name) {
		return payload.group.name;
	}
	return "No Group";
}

export default function PageHeader({ title }: PageHeaderProps) {
	const apiService = useApi();
	const router = useRouter();
	const [yourGroup, setYourGroup] = useState<string>("Loading...");

	useEffect(() => {
		const fetchGroup = async () => {
			try {
				const group = await apiService.get<GroupMeResponse>("/groups/me");
				setYourGroup(extractGroupLabel(group));
			} catch (error) {
				console.error("Could not fetch current group", error);
				setYourGroup("No Group");
			}
		};

		fetchGroup();
	}, [apiService]);

	return (
		<header className="border-b border-gray-200 bg-white">
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
						<Image alt="PlateMate logo" height={20} src="/favicon.svg" width={20} />
					</div>
					<div>
						<div className="text-xl font-semibold text-slate-900">PlateMate</div>
						<p className="text-xs text-slate-500">{title}</p>
					</div>
				</div>
				<button
					className="flex items-center gap-3 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-orange-500/10 hover:text-orange-400 sm:text-base"
					onClick={() => router.push("/groups")}
					type="button"
				>
					{yourGroup}
				</button>
				<div className="flex items-center gap-3 text-sm font-medium sm:text-base">USERNAME</div>
			</div>
		</header>
	);
}
