#!/bin/sh
echo "=========== Building up application ==========="
docker-compose build
echo "=========== Starting up application ==========="
docker-compose up -d
