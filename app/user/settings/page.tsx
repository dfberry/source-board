import useRequireAuth from '@/hooks/useRequireAuth';
import ProfileComponent from '@/components/Profile';
import GitHubUserService from '@/lib/github/user';
import { Suspense } from 'react';

export default async function ProfilePage() {

	const { user, session, isAuthorized } = await useRequireAuth();
	if (!isAuthorized) {
		return null;
	}
	const userProfile = await GitHubUserService.getGithHubUserBySessionResult({ session, user });

	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<ProfileComponent session={session} user={user} githubProfile={userProfile} />
			</Suspense>
		</>
	);
}