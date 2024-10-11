"use client";
import React, { useState, Suspense } from 'react';
import { FaSort, FaArrowUp, FaArrowDown, FaSortNumericUp, FaSortNumericDown, FaSortNumericDownAlt, FaSortNumericUpAlt } from 'react-icons/fa';
import { GitHubStatsResult } from '@/lib/github/stats'; // Adjust the import path as necessary
import StatsCard from '@/components/github/Stats';
import { FaCalendar, FaArchive, FaBoxOpen, FaGlobe, FaLock, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaStar, FaCodeBranch, FaEye, FaChartBar } from 'react-icons/fa';
import { capitalizeFirstLetter } from '@/lib/strings';

interface StatsListCardProps {
    reposStatsExtended: GitHubStatsResult[];
}

interface ColumnNames {
    health_percentage: JSX.Element;
    stars: JSX.Element;
    forks: JSX.Element;
    watchers: JSX.Element;
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
        if (key && sortConfig?.key === key) {
            return sortConfig.direction === 'asc' ? 'text-orange-500' : 'text-orange-700';
        }
        return '';
    };
    const columnNames: ColumnNames = {
        health_percentage: <span className="inline-flex items-center">Health Percentage</span>,
        stars: <span className="inline-flex items-center"><FaStar className="mr-2" />Stars</span>,
        forks: <span className="inline-flex items-center"><FaCodeBranch className="mr-2" />Forks</span>,
        watchers: <span className="inline-flex items-center"><FaEye className="mr-2" />Watchers</span>
    };
    return (
        <Suspense fallback={<p>Loading data...</p>}>
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-4 gap-4 mb-4 bg-gray-200 p-2 rounded">
                    {Object.keys(columnNames).map((key: string) => (
                        <div key={key} className="flex flex-col items-start w-full">
                            <button onClick={() => sortData(key, sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc')}>
                                <span className={`text-lg ${getColumnClass(key)}`}>{capitalizeFirstLetter(key)}</span>
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