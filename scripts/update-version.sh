#!/bin/bash

new_version=$1

# Get the package name from package.json
package_name=$(jq -r '.name' package.json)

# Step 3: Update the version in package.json
jq --arg new_version "$new_version" '.version = $new_version' package.json > tmp.json && mv tmp.json package.json

# Step 4: Update the version in package-lock.json for the correct package
jq --arg new_version "$new_version" --arg package_name "$package_name" '
  .packages[""].version = $new_version |
  .version = $new_version
' package-lock.json > tmp.json && mv tmp.json package-lock.json

# Step 5: Add a new entry to CHANGELOG.md
echo -e "## $new_version\n\n- Your change description here\n" | cat - CHANGELOG.md > tmp.md && mv tmp.md CHANGELOG.md

# Optional: Print the new version
echo "Updated to version $new_version"