import React, { Suspense } from 'react';
import { GitHubRepoStats, GitHubRepoCommunityMetrics } from '@/lib/github/stats'; // Adjust the import path as necessary

interface StatsCardProps {
    stats: GitHubRepoStats;
    metrics: GitHubRepoCommunityMetrics;
    ownerAndRepo: string; // repo name
}

const StatsCard: React.FC<StatsCardProps> = ({ ownerAndRepo, stats, metrics }) => {

    return (
        <article className="border rounded-lg p-4 shadow-md bg-white">
            <header className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-blue-600">
                        <a href={`https://github.com/${ownerAndRepo}`} target="_blank" rel="noopener noreferrer">
                            {ownerAndRepo}
                        </a>
                    </h2>
                </div>
            </header>
            <Suspense fallback={<p>Loading...</p>}>
                <section className="flex justify-around text-center">
                    <div>
                        <p className="text-lg font-semibold">{stats.forks}</p>
                        <p className="text-sm text-gray-500">Forks</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{stats.open_issues}</p>
                        <p className="text-sm text-gray-500">Open Issues</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{stats.stars}</p>
                        <p className="text-sm text-gray-500">Stars</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{stats.watchers}</p>
                        <p className="text-sm text-gray-500">Watchers</p>
                    </div>
                    <div className="flex justify-around text-center">
                        <div>
                            <p className="text-lg font-semibold">{metrics?.health_percentage}%</p>
                            <p className="text-sm text-gray-500">Health</p>
                        </div>
                    </div>
                </section>
            </Suspense>
        </article>
    );
};

export default StatsCard;