**Regulatory Impact Analysis**

Repository for the Regulatory Impact Analysis project, which aims to digitalize the Legislative Procedure.

**Frontend**

Frontend is implemented using html with ejs templating and jquery.

**Backend**

Backend is implemented using express.js and sequelize.

**Structure**

- etc: Configurations.
- init: Initial sql script to be run if database tables are empty.
- lib: Contains helper functions.
- middleware: Includes express.js middleware, such as pdf generation.
- models: Database models.
- public: Contains images, fonts, scripts and files.
- routes: Contains express.js routes.
- services: Includes database connection setup.
- views: Contains ejs pages. 

**Prerequisites**

- npm
- Node.js
- Docker 
- docker-compose

**How to run**

1. Download and istall Prerequisites.
2. Clone project.
3. Run `cp .env.sample .env`.
4. Free ports defined in Dockerfile and docker-compose.yml.
5. Build image: 
`docker-compose build`
6. Start app:
`docker-compose up -d`

**Development**

For local development see Development.md.
