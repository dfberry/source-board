#!/bin/bash

## Prerequisites
## az login --use-device-code
##

DOTENV_PATH="../.env.local"
OUTPUT_PATH="../.env.azure.auth"

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

# Create the service principal and save the JSON output to a file
az ad sp create-for-rbac \
  --name "CICD" \
  --role contributor \
  --scopes /subscriptions/$AZURE_SUBSCRIPTION_ID \
  --sdk-auth > $OUTPUT_PATH

echo "Service principal credentials saved to $OUTPUT_PATH"