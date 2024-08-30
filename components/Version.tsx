import fs from 'fs';
import path from 'path';

export default function VersionComponent() {

    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;


    return (
        <div>
            <p className="text-gray-500">{version}</p>
        </div>
    );
}