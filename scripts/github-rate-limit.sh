curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOURE BEARER TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/rate_limit | jq .