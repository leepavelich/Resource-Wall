Resource Wall
=========
## Description

This is a project to practice our full-stack  web development abilities, using PostgreSQL, Express, Node, and jQuery.

Resource Wall is a web app that allows users to submit resources (URLs) that will then have a preview shown including a title, thumbnail, and description. Users can like, comment, and rate resources.

## Screenshot
!["Screenshot of the main app"](https://github.com/leepavelich/Resource-Wall/blob/master/docs/app-main.png?raw=true)

## Getting Started

1. Create an `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Create a local PostgreSQL database:      `CREATE ROLE labber WITH LOGIN password 'labber';`\
`CREATE DATABASE midterm OWNER labber;`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - an API key from [LinkPreview](https://docs.linkpreview.net/) (there's a free tier)
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
