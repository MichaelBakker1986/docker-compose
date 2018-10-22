BE AWARE webpack does not allow default ERROR-handlers

`docker build . -t=michaelbakker1986/health-check:0.0.7`
`docker run -d -t -i --name health_check -p 3000:3000 -e CLOUD_DB_HOST=185.205.210.59 michaelbakker1986/health-check:0.0.7`