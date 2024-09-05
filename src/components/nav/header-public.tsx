import React from 'react';
import Link from 'next/link';

const Header = () => {

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
                        <Link href="/about">About</Link>
                    </nav>
                </div>

            </div>
        </header>
    );
};

export default Header;