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
			<main className="overflow-auto flex-1">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
					{children}
				</div>
			</main>
			<Toaster />
		</div>
	);
}
