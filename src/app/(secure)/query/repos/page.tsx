import useRequireAuth from '@/hooks/useRequireAuth';
import WatchedReposListComponent from '@/components/userWatchRepos/list';
import UserWatchRepoService from '@/lib/db/userWatchRepo';
import { Suspense } from 'react';

const getData = async (userId: string) => {

	const userWatchRepos = await UserWatchRepoService.listByUserId(userId);

	console.log(userWatchRepos);
	return userWatchRepos;
}

export default async function RepoListPage() {

	console.log("RepoListPage: Start");

	const { user, session, isAuthorized } = await useRequireAuth();
	console.log("RepoListPage: user", user);

	if (!isAuthorized) {
		return (
			<>
				<h1 className="container watched-repos no-auth text-2xl font-bold mb-4">Watched repos: not authenticated</h1>
			</>
		);
	} else {
		console.log("ProfilePage: Authorized");
	}
	const repos = await getData(session?.userId!);

	if (!repos || (Array.isArray(repos) && repos.length === 0)) {
		console.log("Watched repos: No items");
		return (
			<>
				<h1 className="container watched-repos no-watched-repos text-2xl font-bold mb-4">Watched repos: 0</h1>
			</>
		);
	}

	return (
		<>
			<h1 className="container watched-repos count-watched-repos text-2xl font-bold mb-4">Watched repos: {repos.length}</h1>
			<Suspense fallback={<p>Loading data...</p>}>
				<WatchedReposListComponent user={user} session={session} repos={repos} enableCreate={false} enableDelete={false} enableReportLink={true} />
			</Suspense>
		</>
	);
}