

#!/bin/bash

echo "Making Assets Directory - android/app/src/main/assets"
mkdir android/app/src/main/assets

echo "================================================"

echo "Writing build - index.android.bundle"
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 

echo "================================================"

echo "Cleaning Build  - ./gradlew clean"
cd android ./gradlew clean 

echo "================================================"


echo "Removing Duplicate Resources"

echo "Cleaning Drawable Folders"
rm -rf app/src/main/res/drawable-*
echo "================="

echo "Cleaning Raw Folder"
rm -rf app/src/main/res/raw
echo "================="



echo "================================================"

echo "Creating Release Build  - ./gradlew assembleRelease"
./gradlew assembleRelease 

echo "================================================"


