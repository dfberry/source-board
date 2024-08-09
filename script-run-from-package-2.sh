# Install dependencies
az webapp config appsettings set --subscription 19016922-4bf5-4c41-9553-8eff5da1500e --resource-group nextjs-github-app --name source-board --settings SCM_DO_BUILD_DURING_DEPLOYMENT="true"
# Run from package
az webapp config appsettings set --subscription 19016922-4bf5-4c41-9553-8eff5da1500e --resource-group nextjs-github-app --name source-board --settings WEBSITE_RUN_FROM_PACKAGE="1"