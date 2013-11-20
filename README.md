## Requirements:

* [Node.js](http://nodejs.org/)
* [mongoDB](http://www.mongodb.org/)
* [A Heroku user account](https://id.heroku.com/signup/devcenter/)
* [Heroku Toolbelt / Heroku CLI](https://toolbelt.herokuapp.com/)

## Installation

 Init the local git repo:

    $ git clone https://github.com/Pasukaru/heroku.git
    $ cd heroku

 Init heroku:

    $ heroku create

 Verify the remote repository config:

    $ git remote -v

 Install the [MongoLab](https://addons.heroku.com/mongolab/) heroku Add-on:

    $ heroku addons:add mongolab

## Heroku Deployment

 Deploy the code:

    $ git push heroku master

 Open the deployed project in your browser:

    $ heroku open

 Reload the page to get a list of previous visitors stored in the DB