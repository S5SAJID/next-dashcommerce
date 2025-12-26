"use client";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "@bprogress/next";
import type { User } from "better-auth";
import { useEffect, useState } from "react";
import { getCurrentSession } from "@/db/actions/dashboard/common/auth-actions";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser() {
	const { isMobile } = useSidebar();
	const router = useRouter();
	let [user, setUser] = useState<null | User>(null);

	async function getUser() {
		const session = await getCurrentSession();
		setUser(session.user);
	}

	useEffect(() => {
		getUser();
	}, []);

	async function handleSignOut() {
		await authClient.signOut();
		router.push("/signin");
	}
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{user !== null ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								size="lg"
							>
								<Avatar className="h-8 w-8 rounded-lg grayscale">
									{user.image ?? (
										<AvatarImage
											alt={user.name}
											src={user.image as undefined | string}
										/>
									)}
									<AvatarFallback className="rounded-lg">
										{user.name.toUpperCase().slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-muted-foreground text-xs">
										{user.email}
									</span>
								</div>
								<IconDotsVertical className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-(--radix-dropdown-menu-trigger-width) font-[GeistSans] min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										{user.image ? (
											<AvatarImage alt={user.name} src={user.image as string} />
										) : null}
										<AvatarFallback className="rounded-lg uppercase">
											{user.name.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-muted-foreground text-xs">
											{user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleSignOut}>
								<IconLogout />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex gap-2">
						<Skeleton className="size-8" />
						<Skeleton className="flex-1" />
					</div>
				)}
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
