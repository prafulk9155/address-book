#!/bin/bash

# Function to prompt the user for a yes/no response
prompt_yes_no() {
    while true; do
        read -p "$1 (yes/no): " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

echo "git pull ..."
# git pull
if [ $? -ne 0 ]; then
    echo "git pull failed. Exiting."
    exit 1
fi
echo "git pull completed"

echo "Building the project..."
npm run build
if [ $? -ne 0 ]; then
    if prompt_yes_no "Build failed. Do you want to continue anyway?"; then
        echo "Continuing despite build failure."
    else
        echo "Exiting due to build failure."
        exit 1
    fi
fi

echo "Listing all files in the 'build' directory before deployment:"
ls -la dist

# Check if there are any assets in the 'dist' directory
if [ "$(ls -A dist)" ]; then
    if prompt_yes_no "Assets found in 'dist' directory. Do you want to continue and remove the assets on the server?"; then
        echo "Attempting to SSH to 192.168.1.140 with debugging information..."
        ssh -v ogesone@192.168.1.140 "find /var/www/html/ogesone/testing_site -mindepth 1 ! -regex '^/var/www/html/ogesone/testing_site/assets\(/.*\)?' ! -name '.htaccess' -delete"
        if [ $? -ne 0 ]; then
            echo "SSH command failed. Exiting."
            exit 1
        fi
    else
        echo "Uploading files excluding assets..."
        # Create a temporary directory for files excluding assets
        mkdir -p dist_temp
        cp -r dist/* dist_temp/
        rm -rf dist_temp/assets
        scp -r dist_temp/* ogesone@192.168.1.140:/var/www/html/ogesone/testing_site
        rm -rf dist_temp
        if [ $? -ne 0 ]; then
            echo "SCP command failed. Exiting."
            exit 1
        fi
        echo "Files uploaded excluding assets.  Deployment complete."
        exit 0
    fi

    echo "Attempting to SCP files to 192.168.1.140 with debugging information..."
    scp -r dist/* ogesone@192.168.1.140:/var/www/html/ogesone/testing_site
    if [ $? -ne 0 ]; then
        echo "SCP command failed. Exiting."
        exit 1
    fi
else
    echo "No assets found in 'dist' directory."
fi

echo "Deployment complete."
