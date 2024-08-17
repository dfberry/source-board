#!/bin/bash

## Prerequisites
## az login --use-device-code
##

# Ensure the containerapp extension is installed
az extension add --name containerapp

# Enable the preview features for containerapp
az config set extension.use_dynamic_install=yes_without_prompt

DOTENV_PATH="../.env.local"

# Load environment variables from .env file into the script's environment
if [ -f $DOTENV_PATH ]; then
  set -a
  source $DOTENV_PATH
  set +a
else
  echo "Error: .env file not found at $DOTENV_PATH"
  exit 1
fi

# Debug: Display all environment variables loaded from .env
echo "Loaded environment variables from $DOTENV_PATH:"
while IFS='=' read -r key value; do
  echo "$key=$value"
done < $DOTENV_PATH

# Create Azure resource group
az group create \
--subscription $AZURE_SUBSCRIPTION_ID \
--name $AZURE_RESOURCE_GROUP 
--location $AZURE_LOCATION

# Create Azure container registry
az acr create \
--subscription $AZURE_SUBSCRIPTION_ID \
--resource-group $AZURE_RESOURCE_GROUP \
--name $AZURE_CONTAINER_REGISTRY_NAME \
--sku Basic

# Create Azure Container App environment
az containerapp env create --subscription $AZURE_SUBSCRIPTION_ID \
--resource-group $AZURE_RESOURCE_GROUP \
--name $AZURE_CONTAINER_APP_ENV_NAME \
--location $AZURE_LOCATION

# Create Azure container app
az containerapp create \
--subscription $AZURE_SUBSCRIPTION_ID \
--resource-group $AZURE_RESOURCE_GROUP \
--name $AZURE_CONTAINER_APP_NAME \
--environment ${AZURE_CONTAINER_APP_ENV_NAME}

# Enable ingress for Azure Container App
az containerapp ingress enable \
--subscription $AZURE_SUBSCRIPTION_ID \
--name $AZURE_CONTAINER_APP_NAME \
--resource-group $AZURE_RESOURCE_GROUP \
--target-port $TARGET_PORT \
--transport auto \
--type external 

# Set replica count for Azure Container App
az containerapp update \
  --subscription $AZURE_SUBSCRIPTION_ID \
  --resource-group $AZURE_RESOURCE_GROUP \
  --name $AZURE_CONTAINER_APP_NAME \
  --min-replicas 1 \
  --max-replicas 2

# Update CORS settings for Azure Container App to allow anything from github.com
az containerapp update \
  --subscription $AZURE_SUBSCRIPTION_ID \
  --resource-group $AZURE_RESOURCE_GROUP \
  --name $AZURE_CONTAINER_APP_NAME \
  --cors-allowed-origins "https://github.com" \
  --cors-allowed-methods "GET,POST,OPTIONS" \
  --cors-allowed-headers "*"

# Set environment variables for Azure Container App
az containerapp update \
  --subscription $AZURE_SUBSCRIPTION_ID \
  --resource-group $AZURE_RESOURCE_GROUP \
  --name $AZURE_CONTAINER_APP_NAME \
  --build-env-vars "PORT=$TARGET_PORT" \
  --set-env-vars "PORT=$TARGET_PORT"