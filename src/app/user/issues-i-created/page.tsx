import React, { Suspense } from 'react';
import useRequireAuth from "@/hooks/useRequireAuth";
import GitHubIssuesService, { GitHubSearchDefaultQuery } from "@/lib/github/issues";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import { GitHubIssue } from "@/lib/github/issues";
import IssueCard from "@/components/github/Issue";
import GitHubUserService from '@/lib/github/user';
import { getLastDaysRange } from '@/lib/datetime';
import { LastDaysReturn } from '@/lib/datetime';
import SecondHeader from '@/components/nav/header-second';

export default async function QueryIssuesPage() {

	console.log("QueryPage: Start");

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		console.log("QueryIssuesPage: Not authorized");
		return null;
	} else {
		console.log("QueryIssuesPage: Authorized");
	}
	const accessToken = await getDbTokenByDbUserId(session?.userId);

	if (!accessToken) {
		console.log("QueryIssuesPage: No access token");
		return null;
	}
	const { login } = await GitHubUserService.getGithHubUserBySessionResult({ session, user });
	const last30Days: LastDaysReturn = getLastDaysRange();

	const searchParams = {
		[GitHubSearchDefaultQuery.AUTHOR]: login,
		[GitHubSearchDefaultQuery.CREATED]: `${last30Days.startDate}...${last30Days.endDate}`,
	};


	const { items } = await GitHubIssuesService.queryIssues(accessToken, searchParams, login);

	return (
		<>
			<SecondHeader pageName="My Issues" />
			<Suspense fallback={<p className="text-gray-500">Loading data...</p>}>
				<div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
					{!items || (Array.isArray(items) && items.length === 0) ? (
						<p className="container mx-auto p-4 bg-white shadow-md rounded-lg">No issues</p>
					) : (items.map((issue: GitHubIssue) => (
						<IssueCard key={issue.id} issue={issue} showRepoNameEachRow={true} />
					)))}
				</div>
			</Suspense>
		</>
	);
}