"use server";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubRepoService from "@/lib/github/repo";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import useRequireAuth from "@/hooks/useRequireAuth";

export type CreateNewRepoResponse = { 
  message: string 
};

/**
 *
 * @param orgAndRepo: example is 'owner/repo'
 * @returns redirects to
 */

export const CreateNewRepoToWatch = async (orgAndRepo: string): Promise<CreateNewRepoResponse> => {
  const { user, session, isAuthorized } = await useRequireAuth();

  if (!isAuthorized || !session) {
    console.log("createNewRepoToWatch: Not authorized");
    return { message: "Not authorized" };
  }
  const service = new UserWatchRepoService();

  if (!orgAndRepo || orgAndRepo === "") {
    return {message: "value is empty"};
  }
  const accessToken = await getDbTokenByDbUserId(session?.userId);

  // verify repo exists
  const repo = await GitHubRepoService.repoInfo(accessToken!, orgAndRepo);
  if (!repo || repo.length === 0) {
    return { message: "Repo not found" };
  }

  // add repo to db
  await UserWatchRepoService.create(session?.userId, orgAndRepo);
  return { message: "Repo added" };
  revalidatePath("/user/repos");
};
export const DeleteRepoToWatch = async (id: string) => {
  await UserWatchRepoService.delete(id);
  revalidatePath("/user/repos");
};
