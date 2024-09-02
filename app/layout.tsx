import type { Metadata } from "next";
import "./globals.css"
import VersionComponent from "@/components/Version";

export const metadata: Metadata = {
	title: "Open Source Board"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<VersionComponent />
				<div>{children}</div>
			</body>
		</html>
	);
}
