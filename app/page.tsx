import { CONFIG } from "@/lib/config";

export default async function HomePage() {

	const envVars = process.env;

	return (
		<div>
			{/* <div className="container mx-auto p-12 overflow-auto">
				<h1>Environment Variables</h1>
				<div className="p-12">
					{Object.entries(envVars)
						.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
						.map(([key, value]) => (
							<div key={key} className="mb-2">
								<strong>{key}:</strong> {value}
							</div>
						))}
				</div>
			</div>
			<div className="container mx-auto p-12 overflow-auto">
				<h1>CONFIG</h1>
				<div className="p-12">
					{Object.entries(CONFIG)
						.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
						.map(([key, value]) => (
							<div key={key} className="mb-2">
								<strong>{key}:</strong> {value}
							</div>
						))}
				</div>
			</div> */}

			<div className="flex items-center justify-center min-h-screen">
				<a className="bg-blue-500 text-white py-2 px-4 rounded-lg" href="/login/github">Sign in with GitHub</a>
			</div>
		</div>
	);
}

