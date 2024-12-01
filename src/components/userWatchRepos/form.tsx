'use client'

import { CreateNewRepoToWatch } from "@/actions/userWatchRepo";
import { useState, useRef, Suspense, useTransition, FormEvent, ChangeEvent } from "react";
import { z } from "zod";

type FormValues = {
    repo?: string;
};

function validateRepoUrl(orgRepo: string): { success: boolean, repo?: string, error?: any } {

    console.log(`validateRepoUrl start: ${orgRepo}`);
    const cleanedOrgRepo = orgRepo.replace(/^https:\/\/github\.com\//, '');
    const regexOrgRepo = /^[^\/]+\/[^\/]+$/;
    const orgRepoSchema = z.string().regex(regexOrgRepo, "Invalid org/repo format");

    try {

        const result = orgRepoSchema.parse(cleanedOrgRepo);
        console.log(`validateRepoUrl: ${result}`);

        // Extract the org/repo part
        return { success: true, repo: cleanedOrgRepo };
    } catch (e) {
        console.log(`validateRepoUrl error: ${e}`);
        if (e instanceof z.ZodError) {
            e.errors.forEach((error) => {
                console.error(`Validation error: ${error.message}`);
            });
        } else {
            console.error("Validation unexpected error:", e);
        }
        return { success: false, error: e };
    }
}

const NewRepoToWatchForm = ({ timeStamp }: { timeStamp: number }) => {
    const [formValues, setFormValues] = useState<FormValues>({});
    const [error, setError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const action = async () => {
        const url = formValues.repo as string;
        const orgRepo = url.toLowerCase();

        console.log("action url", url);
        const { success, error, repo } = validateRepoUrl(orgRepo);

        if (!success || !repo || repo === "") {
            console.log("action error validat", error);
            setError("The repository URL must conform to the GitHub format: org_or_user/repo_name.");
            return;
        }

        const result = await CreateNewRepoToWatch(repo);
        console.log("create new repo results", result);
        if (result?.message && result?.message.length > 0) setError(result?.message);
        formRef.current?.reset();
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            action();
        });
    };

    return (
        <Suspense fallback={<p>Loading...</p>} key={timeStamp}>
            <div className={`flex items-center justify-between mb-4 p-4 shadow-md rounded-md ${isPending ? 'bg-gray-300' : 'bg-white'}`}>
                <form onSubmit={handleSubmit} ref={formRef} className="p-6 bg-white shadow-md rounded-md">
                    <div className="flex flex-col items-start space-y-4">
                        <label className="text-gray-700 font-semibold">Repo Name</label>
                        <input
                            type="text"
                            name="repo"
                            className={`w-[50ch] p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="myname/myrepo"
                            onChange={handleChange}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </Suspense>
    );
};


export default NewRepoToWatchForm;