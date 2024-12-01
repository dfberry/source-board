'use client'
import { Suspense, useTransition } from 'react'
import { DeleteRepoToWatch } from '@/actions/userWatchRepo'
import Link from 'next/link'
import { RepoWatch } from '@/models/database'

type Props = {
    item: RepoWatch;
    enableDelete: boolean;
    enableReportLink: boolean;
}

const UserWatchRepoItemComponent = ({ item, enableDelete, enableReportLink }: Props) => {

    console.log("UserWatchRepoItemComponent:enableDelete ", enableDelete);
    console.log("UserWatchRepoItemComponent:enableReportLink ", enableReportLink);

    const [isPending, startTransition] = useTransition()

    if (!item) return null;

    return (
        <Suspense fallback={<p>Loading data...</p>}>
            <div className={`flex items-center justify-between mb-4 p-4 shadow-md rounded-md ${isPending ? 'bg-gray-300' : 'bg-white'}`}>
                <span className="flex-1 text-gray-800 font-medium">{item.repo_name}</span>
                <div className="flex space-x-2">
                    {enableReportLink && (
                        <div>
                            <Link
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                                href={`/user/watched/${item.id}`}>
                                Issues and PRs
                            </Link>
                        </div>
                    )}
                    {enableDelete && (
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                            disabled={isPending}
                            onClick={() => startTransition(() => DeleteRepoToWatch(item.id))}
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </button>
                    )}
                </div>
            </div>
        </Suspense>
    )
}

export default UserWatchRepoItemComponent