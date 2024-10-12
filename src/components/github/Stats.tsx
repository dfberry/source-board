import React, { Suspense } from 'react';
import { GitHubRepoStats, GitHubRepoCommunityMetrics } from '@/lib/github/stats'; // Adjust the import path as necessary

import { FaBug, FaHeartbeat, FaCalendar, FaArchive, FaBoxOpen, FaGlobe, FaLock, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaStar, FaCodeBranch, FaEye, FaChartBar } from 'react-icons/fa';
import styles from './StatsCard.module.css';
import { capitalizeFirstLetter } from '@/lib/strings';

interface StatsCardProps {
    stats: GitHubRepoStats;
    metrics: GitHubRepoCommunityMetrics;
    ownerAndRepo: string; // repo name
}
const StatsCard: React.FC<StatsCardProps> = ({ ownerAndRepo, stats, metrics }) => {

    console.log(`componentOwner: ${ownerAndRepo}`);
    const formatDateRange = (stats: GitHubRepoStats) => {
        const formatDate = (date: string | undefined) => date ? new Date(date).toISOString().split('T')[0] : 'n/a';

        return (
            <p className="text-lg">
                {formatDate(stats.created_at)} | {formatDate(stats.last_commit)}
            </p>
        );
    };

    return (
        <article className={`border rounded-lg p-4 shadow-md bg-white relative ${stats.archived ? styles.archived : ''}`}>
            {stats.archived && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
                    <p className="text-4xl font-bold text-gray-500">Archived</p>
                </div>
            )}
            <div className="mb-4 bg-gray-100 p-4 rounded shadow relative z-20">
                <header className="mb-4 flex justify-between items-center">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-bold text-blue-600">
                            <a href={`https://github.com/${ownerAndRepo}`} target="_blank" rel="noopener noreferrer">
                                {ownerAndRepo}
                            </a>
                        </h2>
                        {stats.archived && (
                            <span className="text-red-400 text-xl font-bold ml-auto">Archived</span>
                        )}
                    </div>
                </header>
                <Suspense fallback={<p>Loading...</p>}>
                    <div className="flex justify-between gap-x-12">
                        <div className="flex flex-col w-1/2">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold flex items-center"><FaCalendar className="mr-2" />Dates:</p>
                                {formatDateRange(stats)}
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Archived:</p>
                                <p className="text-lg flex items-center">
                                    {stats.archived ? <FaArchive className="mr-2" /> : <FaBoxOpen className="mr-2" />}
                                    {stats.archived?.toString()}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Size:</p>
                                <p className="text-lg">{stats.size}</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Open Issues:</p>
                                <p className="text-lg">{stats.open_issues}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">License:</p>
                                <p className="text-lg">{stats.license?.name}</p>
                            </div>
                            {/*<div className="flex justify-between">
                                <p className="text-lg font-semibold">Allow Auto Merge:</p>
                                <p className="text-lg flex items-center">
                                    {stats.allow_auto_merge === null ? <FaQuestionCircle className="mr-2" /> : stats.allow_auto_merge ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                                    {stats.allow_auto_merge !== null ? stats.allow_auto_merge!.toString() : ''}
                                </p>
                            </div>*/}
                        </div>
                    </div>
                </Suspense>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <section className="grid gap-5 relative z-20">
                    <div className="grid grid-cols-5 gap-2">
                        <p className="text-lg"><FaHeartbeat className="mr-2" />{metrics?.health_percentage}%</p>
                        <p className="text-lg"><FaStar className="mr-2" />{stats.stars}</p>
                        <p className="text-lg"><FaCodeBranch className="mr-2" />{stats.forks}</p>
                        <p className="text-lg"><FaEye className="mr-2" />{stats.watchers}</p>
                        <p className="text-lg"><FaBug className="mr-2" />{stats.open_issues}</p>
                    </div>
                </section>
            </Suspense>
        </article>
    );
};

export default StatsCard;