import useRequireAuth from '@/hooks/useRequireAuth';
import WatchedReposListComponent from '@/components/userWatchRepos/list';
import ServerApiUserWatchService from '@/lib/backend/db-user';
import { Suspense } from 'react';
import SecondHeader from '@/components/nav/header-second';
import { getDbTokenByDbUserId } from "@/lib/db/db";
import { UserWatchResponse } from "@/models/database";

const getData = async (userId: string, page: number, pageSize: number): Promise<UserWatchResponse> => {
	return await ServerApiUserWatchService.listWatchesByUser(userId, page, pageSize);
}

export default async function RepoListPage() {
	const { user, session, isAuthorized } = await useRequireAuth();
	console.log("RepoListPage user ", user, session);

	if (!isAuthorized) {
		return null;
	}
	const accessToken = await getDbTokenByDbUserId(user?.id!);

	if (!accessToken) {
		return null;
	}

	const watchesResponse = await getData(session?.userId!, 1, 50);
	console.log("RepoListPage", watchesResponse);

	return (
		<>
			<SecondHeader pageName="Watched repos" />
			<WatchedReposListComponent
				user={user}
				session={session}
				repos={watchesResponse?.watches || []}
				enableCreate={false}
				enableDelete={false}
				enableReportLink={true}
			/>
		</>
	);
}