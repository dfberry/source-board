import useRequireAuth from '@/hooks/useRequireAuth';
import WatchedReposListComponent from '@/components/userWatchRepos/list';
import UserWatchRepoService from '@/lib/db/userWatchRepo';
import { Suspense } from 'react';

const getData = async (userId: string) => {

	const userWatchRepos = await UserWatchRepoService.listByUserId(userId);
	return userWatchRepos;
}

export default async function RepoListPage() {


	const { user, session, isAuthorized } = await useRequireAuth();

	if (!isAuthorized) {
		return null;
	}
	const repos = await getData(session?.userId!);

	return (
		<>
			<h1>Watched Repositories</h1>
			<Suspense fallback={<p>Loading data...</p>}>
				<WatchedReposListComponent user={user} session={session} repos={repos} enableCreate={false} enableDelete={false} enableReportLink={true} />
			</Suspense>
		</>
	);
}