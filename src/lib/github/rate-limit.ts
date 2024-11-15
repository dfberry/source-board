import GitHubServiceBase from "./base";

export type GitHubRateLimit = {
  rate: {
    limit: number;
    used: number;
    remaining: number;
    reset: number;
  };
};

export default class GitHubRateLimitService extends GitHubServiceBase {
  static async tokenLimit(
    accessToken: string,
  ): Promise<GitHubRateLimit> {
    if (!accessToken) {
      return Promise.reject(new Error("No access token"));
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    console.log(
      `GitHubRateLimitService.tokenLimit: token=${accessToken}`,
    );

    const url = `https://api.github.com/rate_limit`;
    console.log(`GitHubRateLimitService.tokenLimit: url=${url}`);

    const data = await GitHubServiceBase.fetchFromGitHub(
      url,
      accessToken,
      "GET"
    );

    return data;
  }
}
