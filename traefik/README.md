$Env:COMPOSE_CONVERT_WINDOWS_PATHS=1
docker-compose up -d reverse-proxy


Windows; upgrade docker-compose 
https://github.com/docker/compose/releases/tag/1.23.0-rc3
-v /var/run/docker.sock:/var/run/docker.sock 