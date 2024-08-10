az webapp auth-classic update \
    --subscription 19016922-4bf5-4c41-9553-8eff5da1500e \
    --resource-group nextjs-github-app \
    --name source-board \
	--ids "/subscriptions/19016922-4bf5-4c41-9553-8eff5da1500e/resourceGroups/nextjs-github-app/providers/Microsoft.Web/sites/source-board" \
	--enabled true


az webapp auth-classic show \
    --subscription 19016922-4bf5-4c41-9553-8eff5da1500e \
    --resource-group nextjs-github-app \
    --name source-board \
	--ids "/subscriptions/19016922-4bf5-4c41-9553-8eff5da1500e/resourceGroups/nextjs-github-app/providers/Microsoft.Web/sites/source-board" 