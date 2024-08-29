import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import GitHubPrsService, { GitHubPullRequest, GitHubPrSearchParams, GitHubSearchDefaultQuery } from "@/lib/github/prs";
import PrCard from "@/components/github/Pr";
import { getLastDaysRange } from '@/lib/datetime';
import { LastDaysReturn } from '@/lib/datetime';
import GitHubUserService from '@/lib/github/user';
export default async function QueryPrPage() {

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		return null;
	}
	const searchParams = {
		author: 'diberry',
		repo: 'MicrosoftDocs/node-essentials',
	};
	const accessToken = await getDbTokenByDbUserId(session?.userId);

	if (!accessToken) {
		return null;
	}
	const { login } = await GitHubUserService.getGithHubUserBySessionResult({ session, user });
	const last30Days: LastDaysReturn = getLastDaysRange();

	const { items } = await GitHubPrsService.queryPrs(accessToken, searchParams, login);

	if (!items || (Array.isArray(items) && items.length === 0)) {
		return (
			<>
				<h1 className="text-2xl font-bold mb-4">Issues</h1>
				<p className="container mx-auto p-4 bg-white shadow-md rounded-lg">No issues</p>
			</>
		);
	}

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<h1 className="text-2xl font-bold mb-4">PRs: {searchParams.repo}</h1>
				<div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
					{items.map((pr: GitHubPullRequest) => (
						<PrCard key={pr.id} pr={pr} componentOwner={searchParams.repo} />
					))}
				</div>
			</Suspense>
		</>
	);
}