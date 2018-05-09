![Build Status](https://codeship.com/projects/0bdcbc60-32b4-0136-feee-6eda9d371665/status?branch=master)
[![Code Climate](https://codeclimate.com/github/msgalenwhite/NewsletterApp/badges/gpa.svg)](https://codeclimate.com/github/msgalenwhite/NewsletterApp)
[![Coverage Status](https://coveralls.io/repos/github/msgalenwhite/NewsletterApp/badge.svg?branch=master)](https://coveralls.io/github/msgalenwhite/NewsletterApp?branch=master)

# NewsletterApp

This is an app so that a user can receive a single email at the beginning of the month with all of the entries that their family members have submitted.  

My Trello board to keep track of user stories and acceptance criteria: https://trello.com/b/NfrCdOQi

### Technologies

I used a Rails backend and React frontend, styled with Scss and Foundation.

### Initialize the database

This project uses a postgresql database.

Before viewing the project on localhost, make sure you:
1. Create a database (rake db:create)
2. Load the schema (rake db:schema:load)

### View at localhost:3000

1. Install Ruby gems with 'bundle install'
2. Install NPM packages with 'npm install' or 'yarn install'
3. Start a rails server with 'rails s'
4. Start a javascript server with 'npm start'
5. Navigate to localhost/3000

### Run test suite

1. Rspec tests can be run with 'rspec'
2. React tests need to be run with 'npm test'
