import React from 'react';
import Link from 'next/link';
import AuthButton from './auth';
import LogOut from '@/components/SignOut';

const HeaderSecure = () => {

    return (
        <header className="bg-green-600 text-white p-4 border-green-500">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-1 flex items-center">
                    <div className="text-lg font-bold mr-8">
                        <Link className="ml-0" href="/">
                            Open Source Board
                        </Link>
                    </div>
                    <nav className="space-x-4 ml-8">
                        <Link href="/user/query/issues">
                            Issues
                        </Link>
                        <Link href="/user/query/pr">
                            PRs
                        </Link>
                        <Link href="/user/query/repos">
                            Watched repos
                        </Link>
                        <Link href="/user/query/stats">
                            Watched stats
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center">
                    <LogOut />
                </div>
            </div>
        </header>
    );
};

export default HeaderSecure;