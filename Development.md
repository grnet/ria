**For local development:**

1. Download and istall Prerequisites.
2. Clone project.
3. Run `cp .env.sample .env`.
4. Free ports defined in Dockerfile and docker-compose.yml.
5. Build image: 
`docker-compose build`
6. Start app:
`docker-compose up -d`

This will also create the database, the tables and some [dummy users](https://docs.google.com/spreadsheets/d/1Lw4Bj3v5edPOeNAZJTDbYqwQ2RHBaj-e5q5LXngT2aE/edit#gid=0). 

Access app through [localhost](http://localhost:3000/).

7. to test oauth2 you need a valid domain name and a SSL certificate.
look at [here](etc/nginx/ssl/Readme.md) on how you can generate a self-signed certificate.
Also to start the app with SSL you need to run `docker-compose -f docker-compose-oauth2.dev.yml up -d` 

