
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from React Icons
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { GiShadowFollower } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";
import SignOutComponent from "./SignOut";
import { Suspense } from 'react';

type ProfileComponentProps = {
	session: any;
	user: any;
	githubProfile: any;
};

export default function ProfileComponent({ session, user, githubProfile }: ProfileComponentProps) {

	if (!githubProfile
	) {
		return (
			<div className="container mx-auto p-4">
				<div className="bg-white shadow-md rounded-lg p-6">
					<h1 className="text-2xl font-bold">Profile</h1>
					<p className="mt-4 text-gray-800">No user found</p>
				</div>
			</div>
		);
	}

	return (
		<Suspense fallback={<p>Loading data...</p>}>
			<div className="profile-container">
				<div className="bg-white shadow-md rounded-lg p-6">
					<div className="flex items-center space-x-4">

						<Image
							className="w-16 h-16 rounded-full"
							src={githubProfile.avatar_url}
							alt={`${githubProfile.login}'s avatar`}
							width={64}
							height={64}
						/>

						<div>
							<h1
								data-testid="github-profile-name"
								className="text-2xl font-bold">{githubProfile
									.name}</h1>
							<p
								className="text-gray-600"
								data-testid="github-profile-login">@{githubProfile
									.login}</p>
						</div>
					</div>
					<div className="flex justify-between items-center mt-4">
						<p className="text-gray-800">{githubProfile.bio}</p>
						<Link prefetch={false} href={`/user/settings/repo`} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">Watch repos</Link>
					</div>
					<div id="repos" className="mt-6 bg-blue-500 p-4 rounded-lg flex items-center space-x-4">
						<div className="text-left" title="Number of public repositories">
							<h2 className="text-xl font-semibold text-white">{githubProfile.public_repos}</h2>
							<RiGitRepositoryCommitsLine className="h-6 w-6 mx-auto text-white" />
						</div>
						<div className="text-left">
							<h2 className="text-xl font-semibold text-white">{githubProfile.followers}</h2>
							<GiShadowFollower className="h-6 w-6 mx-auto text-white" />
						</div>
						<div className="text-left">
							<h2 className="text-xl font-semibold text-white">{githubProfile.following}</h2>
							<SlUserFollowing className="h-6 w-6 mx-auto text-white" />
						</div>
					</div>
					<div id="bottom-nav" className="flex justify-between items-center mt-4">
						<Link prefetch={false} href={`https://github.com/${githubProfile.login}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
							<FaGithub className="h-6 w-6 mr-2" />
							<span>GitHub</span>
						</Link>
						<SignOutComponent />
					</div>
				</div>
			</div>
		</Suspense>
	);
}