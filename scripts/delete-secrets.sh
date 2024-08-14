#!/bin/bash

# Define the resource group and container app name
AZURE_SUBSCRIPTION_ID="19016922-4bf5-4c41-9553-8eff5da1500e"
AZURE_RESOURCE_GROUP="nextjs-github-app"
AZURE_CONTAINER_APP_NAME="dfberryapp"

# Get the list of environment variables
# az containerapp update \
#   --subscription $AZURE_SUBSCRIPTION_ID \
#   --name $AZURE_CONTAINER_APP_NAME \
#   --resource-group $AZURE_RESOURCE_GROUP \
#   --remove-all-env-vars

# Get the list of secrets
secrets=$(az containerapp secret list \
  --subscription $AZURE_SUBSCRIPTION_ID \
  --name $AZURE_CONTAINER_APP_NAME \
  --resource-group $AZURE_RESOURCE_GROUP \
  --query "[].name" -o tsv)

echo "Secrets: $secrets"

# # Delete each secret
# for secret in $secrets; do

#   echo "Removing secret $secret"

  if [[ $secret == APP_* ]]; then

    echo "Removing secret $secret"

    # az containerapp secret remove \
    #   --subscription $AZURE_SUBSCRIPTION_ID \
    #   --name $AZURE_CONTAINER_APP_NAME \
    #   --resource-group $AZURE_RESOURCE_GROUP \
    #   --secret-names $secret
  fi
# done