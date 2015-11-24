#!/usr/bin/env bash
docker pull justinthareja/hello-docker:latest  
docker stop app  
docker rm app
docker rmi justinthareja/hello-docker:current  
docker tag justinthareja/hello-docker:latest justinthareja/hello-docker:current  
docker run -d -P --name app justinthareja/hello-docker:latest
