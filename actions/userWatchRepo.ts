"use server";
import UserWatchRepoService from "@/lib/db/userWatchRepo";
import GitHubRepoService from "@/lib/github/repo";
import { getDbTokenByDbUserId } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import useRequireAuth from "@/hooks/useRequireAuth";

/**
 *
 * @param orgAndRepo: example is 'owner/repo'
 * @returns redirects to
 */

export const CreateNewRepoToWatch = async (orgAndRepo: string) => {
  const { user, session, isAuthorized } = await useRequireAuth();

  if (!isAuthorized || !session) {
    console.log("createNewRepoToWatch: Not authorized");
    return null;
  }
  const service = new UserWatchRepoService();

  if (!orgAndRepo || orgAndRepo === "") {
    console.log("createNewRepoToWatch: orgAndRepo is empty");
    return null;
  }
  const accessToken = await getDbTokenByDbUserId(session?.userId);

  // verify repo exists
  const repo = await GitHubRepoService.repoInfo(accessToken!, orgAndRepo);
  if (!repo || repo.length === 0) {
    console.log("createNewRepoToWatch: Repo not found");
    throw new Error("Repo not found");
  }

  // add repo to db
  await UserWatchRepoService.create(session?.userId, orgAndRepo);
  revalidatePath("/user/repos");
};
export const DeleteRepoToWatch = async (id: string) => {
  await UserWatchRepoService.delete(id);
  revalidatePath("/user/repos");
};
