"use client";
import React, { useState, Suspense } from 'react';
import { GitHubStatsResult, GitHubRepoStats, GitHubRepoStatsExtended } from '@/lib/github/stats'; // Adjust the import path as necessary
import StatsCard from '@/components/github/Stats';

interface StatsListCardProps {
    reposStatsExtended: GitHubStatsResult[];
}

const StatsListCard: React.FC<StatsListCardProps> = ({ reposStatsExtended }) => {
    const [statsList, setReposStats] = useState<GitHubStatsResult[]>(reposStatsExtended); // Initialize with your data
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    const sortData = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...reposStatsExtended].sort((a: GitHubStatsResult, b: GitHubStatsResult) => {

            // @ts-ignore
            const aVal: number = a.stats[key];

            // @ts-ignore
            const bVal: number = b.stats[key];

            console.log(`aVal: ${aVal}, bVal: ${bVal}`);

            // @ts-ignore
            if (a.stats[key] < b.stats[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            // @ts-ignore
            if (a.stats[key] > b.stats[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setReposStats(sortedData);
        setSortConfig({ key, direction });
    };
    console.log(`StatsListCard: `, StatsListCard);

    return (
        <Suspense fallback={<p>Loading data...</p>}>
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-5 gap-4 mb-4 bg-gray-200 p-2 rounded">
                    <button onClick={() => sortData('forks')} className="text-lg font-semibold">Asc/Desc</button>
                    <button onClick={() => sortData('open_issues')} className="text-lg font-semibold">Asc/Desc</button>
                    <button onClick={() => sortData('watchers')} className="text-lg font-semibold">Asc/Desc</button>
                    <button onClick={() => sortData('stars')} className="text-lg font-semibold">Asc/Desc</button>
                    <button onClick={() => sortData('health_percentage')} className="text-lg font-semibold">Asc/Desc</button>
                </div>
                {statsList.map((stat: GitHubStatsResult) => (
                    <StatsCard key={stat.repo_name} ownerAndRepo={stat.repo_name} stats={stat.stats} metrics={stat.metrics} />
                ))}
            </div>
        </Suspense>
    )

}

export default StatsListCard;