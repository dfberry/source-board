import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubStatusService, { GitHubRepoStats, GitHubStatsResult } from "@/lib/github/stats";
import StatsListCard from "@/components/github/StatsList";
import GitHubUserService from '@/lib/github/user';
export default async function QueryStatsPage() {

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		return null;
	} else {
	}
	const accessToken = await getDbTokenByDbUserId(session?.userId);
	if (!accessToken) {
		return null;
	}
	const { login } = await GitHubUserService.getGithHubUserBySessionResult({ session, user });
	const repoRows = await UserWatchRepoService.listByUserId(session.userId);


	const repoNames = repoRows.map((row) => row.repoName);

	const reposStats = await GitHubStatusService.queryStatus(accessToken, login, repoNames);

	// add metrics.health_percentage to each repo stats and provide a new type for it
	const reposStatsExtended = reposStats.map((repoStats) => {
		return {
			...repoStats,
			stats: { ...repoStats.stats, health_percentage: repoStats.metrics.health_percentage },
		}
	});

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<h1 className="text-2xl font-bold mb-4">Stats</h1>
				<StatsListCard reposStatsExtended={reposStatsExtended} />
			</Suspense>
		</>
	);
}
