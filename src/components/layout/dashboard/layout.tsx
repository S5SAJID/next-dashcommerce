import BackButton from "@/components/molecules/back-button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

export function DashboardHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
			{children}
		</div>
	);
}

export function DashboardTitle({
	title,
	description,
	enableBack = false,
}: {
	title: React.ReactNode;
	enableBack?: boolean;
	description: string;
}) {
	return (
		<div className="flex space-x-4">
			{enableBack && <BackButton />}
			<div>
				<h2 className="font-bold text-2xl tracking-tight">{title}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
