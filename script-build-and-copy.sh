# clean up
# rm source-board.zip
rm -rf ./.next

# build
npm run build

# copy files
cp -r ./.next/static ./.next/standalone

# zip
# timestamp=$(date +"%Y%m%d%H%M%S")
# cd ./.next/standalone
# zip -r ../../source-board-$timestamp.zip .
# cd ../../

# echo "source-board-$timestamp.zip"

# deploy zip file
#az webapp deploy --subscription 19016922-4bf5-4c41-9553-8eff5da1500e --resource-group nextjs-github-app --name source-board --type zip --src-path source-board-$timestamp.zip 
