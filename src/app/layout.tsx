import type { Metadata } from "next";
import "./globals.css"
import Footer from "@/components/nav/footer";
import PublicHeader from "@/components/nav/header-public";
import useRequireAuth from "@/hooks/useRequireAuth";
import NextBreadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
	title: "Open Source Board"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	const { isAuthorized } = await useRequireAuth();

	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col">
				<PublicHeader />
				<NextBreadcrumb
					homeElement={'Home'}
					separator={<span> | </span>}
					activeClasses='text-blue-500'
					containerClasses='flex bg-green-400 text-black p-4 border-green-500'
					listClasses='hover:underline mx-2 font-bold'
					capitalizeLinks
				/>
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
