#!/bin/bash

# Fetch all branches
git fetch --all

# Get a list of all branches
branches=$(git branch -r | grep -v '\->' | sed 's/^[^\/]*\///')

# Push changes to all branches
for branch in $branches; do
  git checkout $branch
  git pull origin $branch
  git push origin $branch
done

# Checkout back to the original branch (optional)
git checkout main
