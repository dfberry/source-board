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
        'User-Agent': 'open-source-board.com',
      },
      method,
    };

    if (body && Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
    }

    console.log(`GitHubServiceBase.fetchFromGitHub: ${url} ${accessToken}`);
    console.log(`GitHubServiceBase.fetchFromGitHub: options: ${JSON.stringify(options)}`);
    const response = await fetch(url, options);

    response.headers.forEach((value, key) => {
      console.log(`GitHub API request failed for ${url} ${accessToken}: ${key} ${value}`);
    });

    if (!response.ok) {
      console.error(`GitHub API request failed for ${url} ${accessToken}: ${response.statusText}`);

      throw new Error(`GitHub API request failed for: ${response.statusText}`);
    } else {
      console.log(`GitHub API request succeeded for ${url} ${accessToken} ${response.status}`);
    }


    return response.json();
  }
}
