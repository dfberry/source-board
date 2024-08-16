#!/bin/bash

# SECRETS can only be 20 chars

# Define the resource group and container app name
AZURE_SUBSCRIPTION_ID="19016922-4bf5-4c41-9553-8eff5da1500e"
AZURE_RESOURCE_GROUP="nextjs-app-4"
AZURE_CONTAINER_APP_NAME="dfberrynextapp"

# Function to transform secret names to valid Azure Container App secret names
transform_secret_name() {
  local name=$1
  # Replace invalid characters with underscores, convert to lowercase, and replace underscores with dashes
  name=$(echo $name | sed 's/[^a-zA-Z0-9_]/_/g' | tr '[:upper:]' '[:lower:]' | tr '_' '-')
  echo $name
}

# Read the .env.local file and set each value as a secret
while IFS= read -r line || [ -n "$line" ]; do

  # Split the line into key and value
  key=$(echo "$line" | cut -d '=' -f 1)
  value=$(echo "$line" | cut -d '=' -f 2-)

  echo "Setting secret $key"

  # Remove quotes from the value if present
  value=$(echo $value | sed 's/^"//;s/"$//')
  
  # Transform the secret name to a valid one
  TRANSFORMED_KEY=$(transform_secret_name $key)
  
  # Set the secret in Azure Container App
  az containerapp secret set \
    --subscription $AZURE_SUBSCRIPTION_ID \
    --name $AZURE_CONTAINER_APP_NAME \
    --resource-group $AZURE_RESOURCE_GROUP \
    --secrets $TRANSFORMED_KEY=$value

  # Set the environment variable in Azure Container App
  az containerapp update \
    --subscription $AZURE_SUBSCRIPTION_ID \
    --name $AZURE_CONTAINER_APP_NAME \
    --resource-group $AZURE_RESOURCE_GROUP \
    --set-env-vars $key=secretref:$TRANSFORMED_KEY
  
done < ../.env.local