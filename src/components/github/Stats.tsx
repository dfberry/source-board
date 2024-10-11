import React, { Suspense } from 'react';
import { GitHubRepoStats, GitHubRepoCommunityMetrics } from '@/lib/github/stats'; // Adjust the import path as necessary

import { FaCalendar, FaArchive, FaBoxOpen, FaGlobe, FaLock, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaStar, FaCodeBranch, FaEye, FaChartBar } from 'react-icons/fa';

interface StatsCardProps {
    stats: GitHubRepoStats;
    metrics: GitHubRepoCommunityMetrics;
    ownerAndRepo: string; // repo name
}

const StatsCard: React.FC<StatsCardProps> = ({ ownerAndRepo, stats, metrics }) => {

    console.log(`componentOwner: ${ownerAndRepo}`);

    return (
        <article className="border rounded-lg p-4 shadow-md bg-white">
            <div className="mb-4 bg-gray-100 p-4 rounded shadow">
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
                    <div className="flex justify-between gap-x-12">
                        <div className="flex flex-col w-1/2">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold flex items-center"><FaCalendar className="mr-2" />Dates:</p>
                                <p className="text-lg">{new Date(stats.created_at).toISOString().split('T')[0]} | {new Date(stats.last_commit).toISOString().split('T')[0]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Archived:</p>
                                <p className="text-lg flex items-center">
                                    {stats.archived ? <FaArchive className="mr-2" /> : <FaBoxOpen className="mr-2" />}
                                    {stats.archived.toString()}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Size:</p>
                                <p className="text-lg">{stats.size}</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            {/*<div className="flex justify-between">
                                <p className="text-lg font-semibold">Visibility:</p>
                                <p className="text-lg flex items-center">
                                    {stats.visibility === 'public' ? <FaGlobe className="mr-2" /> : <FaLock className="mr-2" />}
                                    {stats.visibility}
                                </p>
                            </div>*/}
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Open Issues:</p>
                                <p className="text-lg">{stats.open_issues}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">License:</p>
                                <p className="text-lg">{stats.license?.name}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Allow Auto Merge:</p>
                                <p className="text-lg flex items-center">
                                    {stats.allow_auto_merge === null ? <FaQuestionCircle className="mr-2" /> : stats.allow_auto_merge ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                                    {stats.allow_auto_merge !== null ? stats.allow_auto_merge.toString() : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </Suspense>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <section className="grid gap-4">
                    <div className="grid grid-cols-4 gap-2">
                        <p className="text-lg font-semibold">Health</p>
                        <p className="text-lg font-semibold flex items-center"><FaStar className="mr-2" />Stars</p>
                        <p className="text-lg font-semibold flex items-center"><FaCodeBranch className="mr-2" />Forks</p>
                        <p className="text-lg font-semibold flex items-center"><FaEye className="mr-2" />Watchers</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <p className="text-lg">{metrics?.health_percentage}%</p>
                        <p className="text-lg">{stats.stars}</p>
                        <p className="text-lg">{stats.forks}</p>
                        <p className="text-lg">{stats.watchers}</p>
                    </div>
                </section>
            </Suspense>
        </article>
    );
};

export default StatsCard;