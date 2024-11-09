
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
							<h1 className="text-2xl font-bold">{githubProfile
								.name}</h1>
							{/* <p className="text-gray-600"><FaGithub className="h-6 w-6 mr-2" /> {githubProfile.login}</p> */}
							<Link prefetch={false} href={`https://github.com/${githubProfile.login}`}><p className="text-gray-800">{githubProfile.bio}</p></Link>
						</div>

					</div>
					<div className="flex justify-between items-center mt-4">

						<Link prefetch={false} href={`/user/settings/repo`} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Configure</Link>
						<SignOutComponent />
					</div>
					<div id="repos" className="mt-6 bg-blue-500 p-4 rounded-lg grid grid-cols-3 gap-4">
						<div className="text-left" title="Number of public repositories">
							<h2 className="text-xl font-semibold text-white">Repos: {githubProfile.public_repos}</h2>
						</div>
						<div className="text-left">
							<h2 className="text-xl font-semibold text-white">Followers: {githubProfile.followers}</h2>
						</div>
						<div className="text-left">
							<h2 className="text-xl font-semibold text-white">Following: {githubProfile.following}</h2>
						</div>
					</div>


				</div>
				<div id="feature-nav" className="flex justify-center items-start mt-4 space-x-4">
					<div className="my-data bg-white shadow-md rounded-lg p-4 w-1/3">
						<h2 className="text-xl font-semibold mb-4 text-center">My Data</h2>
						<div className="flex flex-col">
							<Link prefetch={false} href={`/user/query/issues`} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center mb-2">
								<span>Issues</span>
							</Link>
							<Link prefetch={false} href={`/user/query/pr`} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center mb-2">
								<span>PRs</span>
							</Link>
						</div>
					</div>
					<div className="my-repos bg-white shadow-md rounded-lg p-4 w-1/3">
						<h2 className="text-xl font-semibold mb-4 text-center">Watching Repos</h2>
						<div className="flex flex-col">
							<Link prefetch={false} href={`/user/query/repos`} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center mb-2">
								<span>Repos</span>
							</Link>
							<Link prefetch={false} href={`/user/query/stats`} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
								<span>Stats</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}