#!/bin/bash

BUILD_TYPE=$1

# Exit if anything fails
set -e

# Bring container down
docker-compose down

# Restart the docker container without a rebuild
if [ "${BUILD_TYPE}" = "simple" ]
then
  sudo docker-compose up -d
elif [ "${BUILD_TYPE}" = "complete" ]
then
  sudo DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker-compose up -d --build
else
  echo "Unexpected input, exiting"
fi

# Checking status of the container
sudo docker ps

# Fly way
echo
echo "If everything went well, flux should be running at http://127.0.0.1:3000"
echo "To login to the docker container, run => docker exec -it flux bash"
echo

