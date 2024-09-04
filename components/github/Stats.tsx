import React, { Suspense } from 'react';
import { GitHubRepoStats, GitHubRepoCommunityMetrics } from '@/lib/github/stats'; // Adjust the import path as necessary

interface StatsCardProps {
    stats: GitHubRepoStats;
    metrics: GitHubRepoCommunityMetrics;
    ownerAndRepo: string; // repo name
}

const StatsCard: React.FC<StatsCardProps> = ({ ownerAndRepo, stats, metrics }) => {

    console.log(`componentOwner: ${ownerAndRepo}`);

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
                <section className="grid grid-cols-6 gap-4 mb-4 bg-white p-2 rounded">
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{stats.forks}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{stats.open_issues}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{stats.stars}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{stats.watchers}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{metrics?.health_percentage}%</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg font-semibold">{stats.last_commit}</p>
                    </div>
                </section>
            </Suspense>
        </article>
    );
};

export default StatsCard;