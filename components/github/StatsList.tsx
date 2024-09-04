"use client";
import React, { useState, Suspense } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp, FaSort, FaArrowUp, FaArrowDown, FaSortNumericUp, FaSortNumericDown, FaSortNumericDownAlt, FaSortNumericUpAlt } from 'react-icons/fa';
import { GitHubStatsResult, GitHubRepoStats, GitHubRepoStatsExtended } from '@/lib/github/stats'; // Adjust the import path as necessary
import StatsCard from '@/components/github/Stats';

interface StatsListCardProps {
    reposStatsExtended: GitHubStatsResult[];
}

const StatsListCard: React.FC<StatsListCardProps> = ({ reposStatsExtended }) => {
    const [statsList, setReposStats] = useState<GitHubStatsResult[]>(reposStatsExtended); // Initialize with your data
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    const sortData = (key: string, direction: 'asc' | 'desc') => {
        const sortedData = [...statsList].sort((a: GitHubStatsResult, b: GitHubStatsResult) => {
            // @ts-ignore
            const aVal = a.stats[key];
            // @ts-ignore
            const bVal = b.stats[key];

            if (aVal < bVal) {
                return direction === 'asc' ? -1 : 1;
            }
            if (aVal > bVal) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setReposStats(sortedData);
        setSortConfig({ key, direction });
    };
    const getColumnClass = (key: string) => {
        return sortConfig && sortConfig.key === key ? 'text-blue-500 font-bold' : 'text-gray-700';
    };
    return (
        <Suspense fallback={<p>Loading data...</p>}>
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-6 gap-4 mb-4 bg-gray-200 p-2 rounded">
                    {['forks', 'open_issues', 'watchers', 'stars', 'health_percentage', 'last_commit'].map((key: string) => (
                        <div key={key} className="flex flex-col items-center">
                            <button onClick={() => sortData(key, sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc')}>
                                <span className={`text-lg ${getColumnClass(key)}`}>{key}</span>
                            </button>
                        </div>
                    ))}
                </div>
                {statsList.map((stat: GitHubStatsResult) => (
                    <StatsCard key={stat.repo_name} ownerAndRepo={stat.repo_name} stats={stat.stats} metrics={stat.metrics} />
                ))}
            </div>
        </Suspense>
    )

}

export default StatsListCard;