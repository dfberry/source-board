export default class GitHubServiceBase {
  protected static async fetchFromGitHub(
    url: string,
    accessToken: string,
    method: string = "GET",
    body: Object = {},
  ): Promise<any> {
    const options: RequestInit = {
      headers: {
        Authorization: `token ${accessToken}`,
        "Content-Type": "application/json",
      },
      method,
    };

    console.log(`GitHubServiceBase.fetchFromGitHub: url=${url}, accessToken=${accessToken}, method=${method}, body=`, body);

    if (body && Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(`GitHub API request failed: ${response.statusText}`);
      //throw new Error(`GitHub API request failed: ${response.statusText}`);
      return [];
    }

    return response.json();
  }
}
