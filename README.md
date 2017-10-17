# README

## Running the Application

Assuming you have a typical ruby dev environment set up on your computer and
an instance of MySQL running the application can be run by navigating to the
project root directory and running the following commands:

1. `bundle install`
2. `rake db:setup`
3. `rails server`
4. Navigate to `http://localhost:3000` in the browser of your choice

To run the test suite:

`rake test`

## About This Implementation

I ended up writing a JavaScript SPA with a Rails RESTful API backend to solve
this challenge. I seriously considered a JavaScript SPA with a serverless
backend using AWS Cognito, Lambda, Gateway, S3 and DynamoDB however I've never
used those technologies before so I stuck with what I knew. Rails is boring
but has the advantage of being understood quickly and easily by hundreds of
thousands of Rails developers out there. If the Rails backend was not economical
enough to scale horizontally for the load required it is simple enough to
replace with something that will like express on node or a service written in
Go. Both of those technologies would make better use of CPU resources during
HTTP requests to the LCBO api. The other scaling concern would be the database.
Currently the queries table will grow unbounded eventually hitting a point where
performance is no longer acceptable. This could be addressed by archiving old
queries somewhere else (S3, Redshift, whatever) and limiting the viewable
history to a certain time period. Otherwise you could shard based on
`queries.user_id` but you may want to consider just using a different database.
I'm also not up to date on my JavaScript frontend frameworks. Given more time
I would probably consider using either React or Vue.js. The app is also
extremely ugly, it'd be nice to give it a little love with some CSS to keep
users eyes from bleeding.

## Development

Project layout is pretty standard rails layout with the JavaScript located in
the `javascript` directory.

After modifiying any files under `javascript` you will need to run the following
the generate the concatenated `app.js` file.

`cat javascript/main.js javascript/**/*.js > public/app.js`

It can be useful to use a tool like `inotify` on Linux or `fswatch` on macOS
to make that command run everytime a file under `javascript` is modified
