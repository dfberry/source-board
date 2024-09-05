'use client';
import useRequireAuth from '@/hooks/useRequireAuth';
import React from 'react';
import { useRouter } from 'next/router';


const AuthButton = async () => {

    const router = useRouter();
    const isHomePage = router.pathname === '/';
    const { user, session, isAuthorized } = await useRequireAuth();

    return (
        <>
            <div className="flex-1 flex justify-end">
                {isAuthorized ? (
                    <button className="bg-blue-500 py-2 px-4 rounded-lg">
                        Sign Out
                    </button>
                ) : (
                    <button className="bg-blue-500 py-2 px-4 rounded-lg">
                        Sign In
                    </button>
                )}
            </div>
        </>
    );
};

export default AuthButton;