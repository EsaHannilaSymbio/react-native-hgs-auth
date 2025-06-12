# Request user to enter a version number semver
#!/bin/bash
echo "Enter the version number (semver format, e.g., 1.0.0):"
read version
if [[ -z "$version" ]]; then
  echo "Version number cannot be empty."
  exit 1
fi
# Check if the version number is in semver format
if ! [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Invalid version number format. Please use semver format (e.g., 1.0.0)."
  exit 1
fi
# Check if the version number already exists in the podspec file
if grep -q "s.version = '$version'" ios/HgsAuth.podspec; then
  echo "Version $version already exists in the podspec file."
  exit 1
fi
# Update the podspec file with the new version number
sed -i '' "s/s.version = '[0-9]\+\.[0-9]\+\.[0-9]\+'/s.version = '$version'/" ios/HgsAuth.podspec
# Add the changes to git
git add ios/HgsAuth.podspec
# Commit the changes with a message
git commit -m "Update podspec version to $version"
# Tag the commit with the new version number
git tag "v$version"
# Push the changes to the remote repository
git push origin "v$version"
git push origin main
# Push the changes to the remote repository
echo "Podspec version updated to $version and tagged successfully."
# Run pod spec lint to verify the podspec
./verify.pod.sh
if [ $? -ne 0 ]; then
  echo "Podspec verification failed. Please fix the issues and try again."
  exit 1
fi
echo "Podspec verification passed successfully."