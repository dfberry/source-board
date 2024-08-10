# GitHub OAuth example in Next.js App router

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
