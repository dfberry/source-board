import React from 'react';
import fs from 'fs';
import path from 'path';

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const getAppVersion = () => {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
}

const Footer: React.FC = () => {

    const version = getAppVersion();
    const currentYear = getCurrentYear();

    return (
        <footer className="bg-gray-200 text-center p-4">
            <a href="mailto:info@open-source-board.com" className="text-gray-500 hover:underline block mb-2">
                info@open-source-board.com
            </a>
            <p className="text-gray-500">
                &copy; {currentYear} Open Source Board. All rights reserved.
            </p>
            <div className="text-gray-500">Version {version}</div>
        </footer>
    );
};

export default Footer;