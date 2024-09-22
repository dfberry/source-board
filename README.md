# Source Board

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/dfberry/source-board/badge)](https://scorecard.dev/viewer/?uri=github.com/dfberry/source-board)

## Database

Uses SQLite (`main.db`) database.

```
pnpm i
pnpm dev
```

## Setup

Create a GitHub OAuth app with the callback set to `http://localhost:3000/login/github/callback` and create an `.env` file.

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
ENC_KEY=""
ENC_IV=""
DB_URL="postgresql://"
PORT=3000
GH_OAUTH_STATE=123
GH_REDIRECT_URI=http://localhost:3000
GH_FULL_REDIRECT_URI=http://localhost:3000/login/github/callback
GITHUB_REDIRECT_URI=http://localhost:3000/login/github/callback
BACKEND_URL="https://"
```

## Polyfill

If you're using Node 16 or 18, uncomment the code in `lib/auth.ts`. This is not required in Node 20, Bun, and Cloudflare Workers.

```ts
// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;
```

https://whateverittech.medium.com/authenticate-next-14-app-router-with-lucia-auth-92816b1831ff

## Restart with clean db and cookie

- Delete cookie
- Delete `source-board` db in pgAdmin
- Create `source-board` db in pgAdmin
- run `npm run db:generate`
- run `npm run db:push`
- run `npm run dev`

## Session clean up

Old sessions are kept around, you'll need to handle cleanup of them yourself. In terms of knowing which session to return, it doesn't. If you don't send a cookie back with a session ID Lucia treats you as having no session. And if you log in again a new one is simple created

## Resources

https://medium.com/@dileepa.mabulage/deploying-a-next-js-14-app-to-azure-app-service-using-github-actions-f5119a56e9f4

## GitHub Action deploy to Azure App Service

- Enable basic auth

  ```
  az webapp auth-classic update \
  --subscription 19016922-4bf5-4c41-9553-8eff5da1500e \
  --resource-group nextjs-github-app \
  --name source-board \
  --ids "/subscriptions/19016922-4bf5-4c41-9553-8eff5da1500e/resourceGroups/nextjs-github-app/providers/Microsoft.Web/sites/source-board" \
  --enabled true
  ```

- Download publish profile from Azure portal (XML format)
- Save to GitHub as repo secret
- Reference repo secret

  ```
  - name: "Deploy to Azure Web App"
      id: deploy-to-webapp
      uses: azure/webapps-deploy@v2
      with:
      app-name: ${{ env.WEBAPP_NAME }}
      slot-name: "Production"
      publish-profile: ${{ secrets.APP_PUBLISH_PROFILE }}
      package: ./build/standalone
  ```

## Troubleshooting

### Ports

The error TargetPort does not match the listening port indicates that the container is listening on a port different from the one that the Azure Container App is configured to use for incoming traffic.

TargetPort is the port your Azure Container App expects to receive traffic on.
ListeningPort is the port your application inside the container is actually using.

## New change

1. Checkout from main to new branch: `git checkout -b dfberry/0903-featues`
2. Finish task
3. Checkout stage and merge branch:

```
git checkout stage
git merge dfberry/0903-features
```

4. Push to origin to deploy to vercel

```
git push origin stage
```

5. Checkout main and merge stage:

```
  git checkout main
  git merge stage
```

## Update version

```
bash scripts/update-version.sh <new-version-number>
```

## Playwright codegen

1. In dev container:

  ```shell
  npm run dev:test
  ```

  This uses the auth found in the .env file. Check the port to make sure the app is running on 3000 and not 3001.

1. In the host computer:

  ```shell
  npx playwright codegen http://localhost:3000
  ```

## Deploy to Vercel stage

* Push to stage

## Deploy to Vercel live

* Push to main