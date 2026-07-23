#!/bin/sh
set -e

export GIT_COMMIT_SHA=$(git rev-parse HEAD)
export GIT_COMMIT_MSG="$(git log -1 --pretty=%B)"

docker compose up --build -d