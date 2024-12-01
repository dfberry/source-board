import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubStatusService, { GitHubRepoStats, GitHubStatsResult } from "@/lib/github/stats";
import StatsListCard from "@/components/github/StatsList";
import GitHubUserService from '@/lib/github/user';
import SecondHeader from '@/components/nav/header-second';
import ServerApiUserWatchService from '@/lib/backend/db-user';

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
	const userWatchRepoResponse = await ServerApiUserWatchService.listWatchesByUser(session.userId, 1, 50);
	let reposStatsExtended = [] as GitHubStatsResult[];


	if (userWatchRepoResponse && userWatchRepoResponse?.watches) {

		//const repoRows = await UserWatchRepoService.listByUserId(session.userId);
		console.log("QueryStatsPage: repos=", userWatchRepoResponse?.watches);

		const repoNames = userWatchRepoResponse?.watches?.map((row) => row.repo_name);

		const reposStats = await GitHubStatusService.queryStatus(accessToken, login, repoNames);
		console.log("QueryStatsPage: reposStats=", reposStats);

		// add metrics.health_percentage to each repo stats and provide a new type for it
		reposStatsExtended = reposStats.map((repoStats) => {
			return {
				...repoStats,
				stats: { ...repoStats.stats, health_percentage: repoStats.metrics.health_percentage },
			}
		});
	}

	return (
		<>
			<SecondHeader pageName="Stats" />
			<Suspense fallback={<p>Loading data...</p>}>
				<StatsListCard reposStatsExtended={reposStatsExtended} />
			</Suspense>
		</>
	);
}
