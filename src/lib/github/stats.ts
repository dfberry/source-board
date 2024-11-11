import GitHubServiceBase from "./base";

export interface GitHubRepoCommunityMetrics {
  health_percentage: number;
  description?: string;
  documentation?: string;
  files?: string[];
  updated_at?: string;
  content_reports_enabled?: boolean;
}

export interface License {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url?: string; // Assuming Url is a string representation
  html_url?: string; // Assuming Url is a string representation
  description?: string;
  implementation?: string;
  permissions?: string[];
  conditions?: string[];
  limitations?: string[];
  body?: string;
  featured?: boolean;
}

export interface GitHubRepoStats {
  forks: number;
  open_issues: number;
  stars: number;
  watchers: number;
  last_commit: string;
  archived?: boolean;
  size?: number;
  visibility?: string;
  created_at?: string;
  license?: License;
  allow_auto_merge?: boolean;
}

export interface GitHubRepoStatsExtended {
  forks: number;
  open_issues: number;
  stars: number;
  watchers: number;
  health_percentage: number;
}

export interface GitHubStatsResult {
  errors: string[];
  repo_name: string;
  stats: GitHubRepoStats;
  metrics: GitHubRepoCommunityMetrics;
}
export interface GitHubStatsExtendedResult {
  repo_name: string;
  stats: GitHubRepoStatsExtended;
}

export default class GitHubStatusService extends GitHubServiceBase {
  static async queryStatus(
    accessToken: string,
    githubUserId: string,
    reposList: string[],
  ): Promise<GitHubStatsResult[]> {
    if (!accessToken) {
      return Promise.reject(new Error("No access token"));
    }
    const body = {
      repos: reposList,
      token: accessToken,
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
