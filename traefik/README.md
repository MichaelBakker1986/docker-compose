$Env:COMPOSE_CONVERT_WINDOWS_PATHS=1
docker-compose up -d reverse-proxy


Windows; upgrade docker-compose 
https://github.com/docker/compose/releases/tag/1.23.0-rc3
-v /var/run/docker.sock:/var/run/docker.sock



docker run -d -v /var/run/docker.sock:/var/run/docker.sock -v $PWD/traefik.toml:/traefik.toml -v $PWD/acme.json:/acme.json -p 80:80 -p 443:443 -l traefik.frontend.rule=Host:monitor.example.com -l traefik.port=8080 --network proxy --name traefik traefik:1.3.6-alpine --docker 