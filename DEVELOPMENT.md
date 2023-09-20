# For local development: 

1. Download and istall Prerequisites.
2. Clone project.
3. Run `npm i` to install project packages.
4. Run `cp .env.sample .env`.
5. Free ports defined in Dockerfile and docker-compose.yml.
6. Build images: 
`docker-compose -f docker-compose.yml build`
7. Start app:
`docker-compose -f docker-compose.yml up -d`

Access app through [localhost](http://localhost:3000/).

8. to test oauth2 you need a valid domain name and a SSL certificate.
look at [here](etc/nginx/ssl/Readme.md) on how you can generate a self-signed certificate.
Also to start the app with SSL you need to run `docker-compose -f docker-compose-oauth2.dev.yml up -d` 

