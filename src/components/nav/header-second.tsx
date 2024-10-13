import React from 'react';
import Link from 'next/link';

interface SecondHeaderProps {
    pageName: string;
}

const SecondHeader: React.FC<SecondHeaderProps> = ({ pageName }) => {
    return (
        <header className="bg-green-400 text-black p-4 border-green-500">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    {pageName}
                </div>
            </div>
        </header>
    );
};

export default SecondHeader;