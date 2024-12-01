import useRequireAuth from '@/hooks/useRequireAuth';
import WatchedReposListComponent from '@/components/userWatchRepos/list';
import UserWatchRepoService from '@/lib/db/userWatchRepo';
import NewRepoToWatchForm from '@/components/userWatchRepos/form';
import { Suspense } from 'react';
import SecondHeader from '@/components/nav/header-second';
import ServerApiUserWatchService from '@/lib/backend/db-user';
import { UserWatchResponse } from "@/models/database";

const getData = async (userId: string, page: number = 1, pageSize: number = 50): Promise<UserWatchResponse> => {
	return ServerApiUserWatchService.listWatchesByUser(userId, page, pageSize);
}

export default async function UserSettingsPage() {

	const { user, session, isAuthorized } = await useRequireAuth();
	console.log("UserSettingsPage ", user, session);

	if (!isAuthorized) {
		console.log("UserSettingsPage: Not authorized");
		return null;
	} else {
		console.log("UserSettingsPage: Authorized");
	}
	const repoResult = await getData(session?.userId!);
	console.log("UserSettingsPage", repoResult);

	// Get the current timestamp
	const timeStamp = Date.now();

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<WatchedReposListComponent user={user} session={session} repos={repoResult?.watches || []} enableCreate={true} enableDelete={true} enableReportLink={false} timeStamp={timeStamp} />
			</Suspense>
		</>
	);
}