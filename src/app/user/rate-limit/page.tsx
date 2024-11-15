import useRequireAuth from '@/hooks/useRequireAuth';
import WatchedReposListComponent from '@/components/userWatchRepos/list';
import UserWatchRepoService from '@/lib/db/userWatchRepo';
import NewRepoToWatchForm from '@/components/userWatchRepos/form';
import { Suspense } from 'react';
import SecondHeader from '@/components/nav/header-second';
import GitHubRateLimitService, { GitHubRateLimit } from '@/lib/github/rate-limit';
import { access } from 'fs';
import { getDbTokenByDbUserId } from "@/lib/db/db";

const getData = async (accessToken: string): Promise<GitHubRateLimit> => {

	return GitHubRateLimitService.tokenLimit(accessToken);
}

export default async function RateLimitPage() {

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!isAuthorized) {
		console.log("RateLimitPage: Not authorized");
		return null;
	} else {
		console.log("RateLimitPage: Authorized");
	}
	const accessToken = await getDbTokenByDbUserId(session?.userId!);
	const repos = await getData(accessToken!);

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<div>
					{repos && (
						<pre>{JSON.stringify(repos, null, 2)}</pre>
					)}
				</div>
			</Suspense>
		</>
	);
}