import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubStatusService, { GitHubRepoStats, GitHubStatsResult } from "@/lib/github/stats";
import StatsListCard from "@/components/github/StatsList";
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

	// add metrics.health_percentage to each repo stats and provide a new type for it
	const reposStatsExtended = reposStats.map((repoStats) => {
		return {
			...repoStats,
			stats: { ...repoStats.stats, health_percentage: repoStats.metrics.health_percentage },
		}
	});

	if (!reposStatsExtended || (Array.isArray(reposStatsExtended) && reposStatsExtended.length === 0)) {
		console.log("Watch repo stats: No items");
		return (
			<>
				<h1 className="container watched-repo-stats no-watched-repo-stats text-2xl font-bold mb-4">Watched repo stats: 0</h1>

			</>
		);
	}

	return (
		<>
			<h1 className="container watched-repo-stats count-watched-repo-stats text-2xl font-bold mb-4">Watched repo stats: {reposStatsExtended.length}</h1>
			<Suspense fallback={<p>Loading data...</p>}>
				<StatsListCard reposStatsExtended={reposStatsExtended} />
			</Suspense>
		</>
	);
}
