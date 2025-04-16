"use client";

import { Toaster } from "@/components/ui/toaster";
import { Header } from "./header";

interface MainLayoutProps {
	children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="flex h-screen flex-col">
			<Header />
			<main className="overflow-auto">{children}</main>
			<Toaster />
		</div>
	);
}
