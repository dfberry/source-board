import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import GitHubPrsService, { GitHubPullRequest, GitHubPrSearchParams, GitHubSearchDefaultQuery } from "@/lib/github/prs";
import PrCard from "@/components/github/Pr";
import { getLastDaysRange } from '@/lib/datetime';
import { LastDaysReturn } from '@/lib/datetime';
import GitHubUserService from '@/lib/github/user';
import SecondHeader from '@/components/nav/header-second';

export default async function QueryPrPage() {

	console.log("QueryPage: Start");

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		console.log("QueryPrPage: Not authorized");
		return null;
	} else {
		console.log("QueryPrPage: Authorized");
	}
	const searchParams = {
		author: 'diberry',
		repo: 'MicrosoftDocs/node-essentials',
	};
	const accessToken = await getDbTokenByDbUserId(session?.userId);

	if (!accessToken) {
		console.log("QueryPrPage: No access token");
		return null;
	}
	const { login } = await GitHubUserService.getGithHubUserBySessionResult({ session, user });
	const last30Days: LastDaysReturn = getLastDaysRange();

	const { items } = await GitHubPrsService.queryPrs(accessToken, searchParams, login);

	return (
		<>
			<SecondHeader pageName="My PRs" />
			<Suspense fallback={<p>Loading data...</p>}>
				<div className="container mx-auto p-4 bg-white shadow-md rounded-lg">

					{!items || (Array.isArray(items) && items.length === 0) ? (
						<p className="container mx-auto p-4 bg-white shadow-md rounded-lg">No issues</p>
					) : (items.map((pr: GitHubPullRequest) => (
						<PrCard key={pr.id} pr={pr} componentOwner={searchParams.repo} showRepoNameEachRow={true} />
					)))}
				</div>
			</Suspense>
		</>
	);
}