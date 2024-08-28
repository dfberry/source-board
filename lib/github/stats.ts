import GitHubServiceBase from "./base";

export interface GitHubRepoStats {
  forks: number;
  open_issues: number;
  stars: number;
  watchers: number;
}

export interface GitHubStatsResult {
  errors: string[];
  repo_name: string;
  stats: GitHubRepoStats;
}

export default class GitHubStatusService extends GitHubServiceBase {
  static async queryStatus(
    accessToken: string,
    githubUserId: string,
    reposList: string[],
  ): Promise<any> {
    if (!accessToken) {
      return Promise.reject(new Error("No access token"));
    }
    const body = {
      repos: reposList,
    };
    console.log(
      `GitHubStatusService.queryStatus: body=${JSON.stringify(body)}`,
    );

    const url = `${process.env.BACKEND_URL}/github/repos/stats`;
    console.log(`GitHubPrsService.queryIssues: url=${url}`);

    const data = await GitHubServiceBase.fetchFromGitHub(
      url,
      accessToken,
      "POST",
      body,
    );

    return data;
  }
}
