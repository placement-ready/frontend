#!/bin/bash

# This script sets up the development environment by installing necessary dependencies.
# It should be run once after cloning the repository.

echo "Setting up the development environment..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Please check your npm configuration."
    exit 1
fi

echo "Dependencies installed successfully."
echo "You can now start the development server using 'npm run dev'."
exit 0

