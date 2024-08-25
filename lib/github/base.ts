export default class GitHubServiceBase {
  protected static async fetchFromGitHub(
    url: string,
    accessToken: string,
    method: string = "GET",
    body: Object = {},
  ): Promise<any> {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`GitHub API request failed: ${response.statusText}`);
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    return response.json();
  }
}
