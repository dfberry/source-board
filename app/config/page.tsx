import { getPackageVersion } from "@/lib/config";
export default async function ConfigPage() {

    const version = getPackageVersion();

    return (
        <>
            <h1>{version}</h1>
        </>
    );
}