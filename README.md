tasknado
========

A task manager Web app using AngularJS, Express.js, PostgreSQL, Bootstrap, Bower, and Jade, complete with a ridiculous name.

This project assumes you have PostgreSQL installed.

Clone this repo, then do the following:

npm install
bower install
runpsql.sh
    create database tasknado;
    \q
db-migrate up
node bin/www
