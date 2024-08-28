import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubStatusService, { GitHubRepoStats, GitHubStatsResult } from "@/lib/github/stats";
import StatsCard from "@/components/github/Stats";
import GitHubUserService from '@/lib/github/user';
export default async function QueryStatsPage() {

	console.log("QueryStatsPage: Start");

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		console.log("QueryStatsPage: Not authorized");
		return null;
	} else {
		console.log("QueryStatsPage: Authorized");
	}
	const accessToken = await getDbTokenByDbUserId(session?.userId);
	if (!accessToken) {
		console.log("QueryPrPage: No access token");
		return null;
	}
	const { login } = await GitHubUserService.getGithHubUserBySessionResult({ session, user });
	const repoRows = await UserWatchRepoService.listByUserId(session.userId);
	console.log("QueryStatsPage: repos=", repoRows);

	const repoNames = repoRows.map((row) => row.repoName);

	const reposStats = await GitHubStatusService.queryStatus(accessToken, login, repoNames);
	console.log("QueryStatsPage: reposStats=", reposStats);

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<h1 className="text-2xl font-bold mb-4">Stats</h1>
				<div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
					{reposStats.map((repoStatsResponse: GitHubStatsResult) => (
						<StatsCard key={repoStatsResponse.repo_name} ownerAndRepo={repoStatsResponse.repo_name} stats={repoStatsResponse.stats} />
					))}
				</div>
			</Suspense>
		</>
	);
}