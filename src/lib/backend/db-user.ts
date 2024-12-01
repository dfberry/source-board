import { or } from "drizzle-orm";
import { fetchData } from "./base";
import { RepoWatch, UserWatchResponse } from "@/models/database";

export default class ServerApiUserWatchService {
  static async listWatchesByUser(
    userId: string,
    page: number=1,
    pageSize: number=50,
  ): Promise<UserWatchResponse> {
    console.log("listWatchesByUser", userId);

    const url = `/user/${userId}/watches?page=${page}&page_size=${pageSize}`;
    console.log("listWatchesByUser url", url);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await fetchData(url, options);
  }

  static async deleteWatchForUser(
    userId: string,
    watchId: string): Promise<void> {
    console.log("deleteWatchForUser", userId, watchId);

    const url = `/user/${userId}/watch/${watchId}`;
    console.log("deleteWatchForUser url", url);

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetchData(url, options, undefined, false);

  }
  static async createWatchForUser(
    userId: string,
    orgAndRepo: string): Promise<RepoWatch> {

      if(!userId || ! orgAndRepo) {
        throw new Error("createWatchForUser: userId or orgAndRepo is empty");
      }

    console.log("createWatchForUser", userId, orgAndRepo);

    const url = `/user/${userId}/watch`;
    console.log("createWatchForUser url", url);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repo_name: orgAndRepo }),
    };

    return await fetchData(url, options);
  }
}
