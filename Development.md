**For local development:**

1. Install prerequisites.
2. Clone project.
3. Make necessary changes to .env file and the parameters found within, if needed.
4. Make sure that the ports defined inside Dockerfile.dev and docker-compose.dev.yml are free, otherwise make appropiate changes.
5. Build image:
`docker-compose build`

This will also create the database and some [dummy users](https://docs.google.com/spreadsheets/d/1Lw4Bj3v5edPOeNAZJTDbYqwQ2RHBaj-e5q5LXngT2aE/edit#gid=0). 
6. Start app:
`docker-compose -f docker-compose.dev.yml up -d`

Access app through [localhost](http://localhost:3000/).
