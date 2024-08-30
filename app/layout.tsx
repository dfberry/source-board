import type { Metadata } from "next";
import "./globals.css"
import VersionComponent from "@/components/Version";

export const metadata: Metadata = {
	title: "Source Board"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
				<footer>
					<VersionComponent />
				</footer>
			</body>
		</html>
	);
}
