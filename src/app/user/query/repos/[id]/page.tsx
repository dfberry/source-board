import useRequireAuth from "@/hooks/useRequireAuth";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import GitHubRepoIssues, { FetchIssuesParams, GitHubIssue } from "@/lib/github/repos";
import IssueCard from "@/components/github/Issue";
import PrCard from "@/components/github/Pr";
import { getLastDaysRange } from '@/lib/datetime';
import { Suspense } from "react";
import UserWatchRepoService from "@/lib/db/userWatchRepo";

type QueryReposPageProps = {
	params: {
		id: string;
	};
};

export default async function QueryReposPage({ params }: QueryReposPageProps) {

	console.log("QueryPage: Start");

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!session || !isAuthorized) {
		console.log("ProfilePage: Not authorized");
		return null;
	} else {
		console.log("ProfilePage: Authorized");
	}
	const accessToken = await getDbTokenByDbUserId(session?.userId);

	if (!accessToken) {
		console.log("QueryPage: No access token");
		return null;
	}

	const repoFromDb = await UserWatchRepoService.read(params.id);

	if (!repoFromDb || repoFromDb.length === 0) {
		throw new Error("Repo not found");
	}
	const repo = repoFromDb[0].repoName;
	console.log("QueryReposPage: repoFromDb", repoFromDb[0]);

	const last30Days = getLastDaysRange();

	const fetchIssuesParams: FetchIssuesParams = {
		repo: repo,
		dateRange:
		{
			start: last30Days.startDateTime!,
			end: last30Days.endDateTime!
		},
		state: 'open',
		// labels: ['bug', 'enhancement'],
		// assignee: 'diberry',
		// creator: 'diberry',
		// mentioned: 'diberry',
		// sort: 'created',
		// direction: 'asc'
	};

	const issues = await GitHubRepoIssues.fetchIssues(fetchIssuesParams, accessToken);

	return (
		<>
			<div className="flex justify-center mt-4 space-x-4 mb-5">
				<a href="#issues" className="px-4 py-2 bg-green-500 text-white rounded-lg">Issues</a>
				<a href="#prs" className="px-4 py-2 bg-green-500 text-white rounded-lg">Pull Requests</a>
			</div>
			<Suspense fallback={<p>Loading issues...</p>}>
				<h1 id="issues" className="text-2xl bg-green-300 text-center">{fetchIssuesParams.repo}</h1>
				<h2 className="text-2xl bg-green-300 text-center text-gray-500">issues</h2>
				<div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
					{issues.map((issue) => (
						<IssueCard key={issue.id} issue={issue} showRepoNameEachRow={false} />
					))}
				</div>
			</Suspense>
		</>

	);
}