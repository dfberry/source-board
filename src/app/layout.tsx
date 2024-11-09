import type { Metadata } from "next";
import "./globals.css"
import Footer from "@/components/nav/footer";
import PublicHeader from "@/components/nav/header-public";
import HeaderSecure from "@/components/nav/header-secure";
import useRequireAuth from "@/hooks/useRequireAuth";

export const metadata: Metadata = {
	title: "Open Source Board"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	const { isAuthorized } = await useRequireAuth();

	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col">
				{!isAuthorized && <PublicHeader />}
				{isAuthorized && <HeaderSecure />}
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
