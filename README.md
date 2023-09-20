# Regulatory Impact Analysis

Repository for the Regulatory Impact Analysis project.

# About

In the Greek Legislative Procedure any new law and any amendment of any law submitted in the Greek Parliament is accompanied by a Regulatory Impact Analysis. This analysis is composed by a set of eight distinct essays, each documenting a series of potential impacts.

This project aims to digitalize the Legislative Procedure, providing an end-to-end solution, from the drafting of a law, to gathering the digital signatures of Ministers and to its final submission in the Greek Parliament for voting.      

As a platform, it allows multiple users to intervene at different stages to the composition of the final Analysis, using a multi-page form with several fields that capture the necessary information. It follows the whole lifecycle of the production of the final Analysis and minimizes the exchange of information via emails between Ministries. 

# Frontend

The frontend is implemented using html forms with ejs templating and jquery.

# Backend

The backend is implemented using express.js and sequelize.

# Structure

- etc: Configurations.
- init: Initial sql script to be run if database tables are empty.
- lib: Contains helper functions.
- middleware: Includes express.js middleware, such as pdf generation.
- models: Sequelize models.
- public: Contains images, fonts, frontend js scripts and files.
- routes: Contains express.js routes.
- services: Includes database connection setup.
- views: Forntend pages. 

# Prerequisites

- npm
- Node.js >= 14.21.3
- Docker 

# How to run

1. Download and istall Prerequisites.
2. Clone project.
3. Run `npm i` to install project packages.
4. Run `cp .env.sample .env`.
5. Free ports defined in Dockerfile and docker-compose.yml.
6. Build images: 
`docker-compose -f docker-compose.yml build`
7. Start app:
`docker-compose -f docker-compose.yml up -d`

# Development

For local development see Development.md.