import { Suspense } from 'react';
import NewRepoToWatchForm from './form'
import UserWatchRepoItemComponent from './item'
import { UserWatchResponse, RepoWatch } from '@/models/database';
import { timeStamp } from 'console';

type Props = {
    user: any;
    session: any;
    repos: RepoWatch[];
    enableDelete: boolean;
    enableReportLink: boolean;
    enableCreate: boolean;
    timeStamp?: number;
}

const WatchedReposListComponent = ({ repos, enableDelete, enableReportLink, enableCreate, timeStamp }: Props) => {

    console.log("WatchedReposListComponent:", enableDelete);

    return (
        <>
            <Suspense fallback={<p>Loading data...</p>} key={timeStamp}>
                {enableCreate && <NewRepoToWatchForm timeStamp={timeStamp!} />}
                <hr className="my-4" />
                <div>
                    {repos.map((repo: any) => (
                        <UserWatchRepoItemComponent key={repo.id + '-' + timeStamp} item={repo} enableDelete={enableDelete} enableReportLink={enableReportLink} />
                    ))}
                </div>
            </Suspense>
        </>
    )
}

export default WatchedReposListComponent;