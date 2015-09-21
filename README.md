# Nookie

## Overview
User authentication API with client dashboard.

1. [Getting Started](#getting-started)
2. [Build](#build)
  * [gulp](#1-gulp)
  * [clean](#2-gulp-clean)
  * [global](#3-gulp-global)
  * [client](#4-gulp-client)
  * [sass](#5-gulp-sass)
  * [jade](#6-gulp-jade)
  * [build](#7-gulp-build)
  * [sever](#8-gulp-server)
  * [open](#9-gulp-open)
3. [Test](#test)
  * [environment](#environment)
  * [gulp test](#gulp-test)
4. [API](#api)
  * [Users](#users)
  * [Stats](#stats)

## Getting Started

In order to run the app you'll need:

 1. Node ~v4.0.0 - [Download](https://nodejs.org)
 2. MongoDB - [Download](https://mongodb.org)

How to start?

 1. Install the dependencies mentioned above
 2. Make sure the MongoDB server is running
 3. Get the project files
 4. Run **npm install** to install the *node.js* modules
 5. Run **gulp --browse**
 6. This will run and open the project in your default browser

## Build

##### 1. gulp

Build the project for **development** and start the server.

* *noflag*
  * builds the project for **development** and starts the server.
* *--production*
  * builds the project for **production** and starts the server
* *--browse*
  * opens the project in your default browser after the build is complete

Includes:
* clean
* global
* client
* sass
* jade
* build
* server
* open (if *--browse*)

##### 2. gulp clean

Removes the *built* files (e.g. app.min.js or global.css).

##### 3. gulp global

Runs JSHint for all the project's files.

##### 4. gulp client

* *noflag*
  * concatenates the **client JS** files into **app.js**.
  * reloads the browser window
* *--production*
  * concatenates the **client JS** files into **app.min.js**.
  * removes the *debug specific functions* (e.g. console.log())
  * uglifies the files
  * reloads the browser window

##### 5. gulp sass

* *noflag*
  * compiles and merges the **Sass** files into **global.css**
  * autoprefixes the CSS rules
  * reloads the browser window
* *--production*
  * compiles and merges the **Sass** files into **global.min.css**
  * autoprefixes the CSS rules
  * minfies the CSS
  * reloads the browser window

##### 6. gulp jade

Used to watch **Jade** files in order to reload the browser's window on change.

##### 7. gulp build

Injects the local **CSS**, **JS** and **bower** into the template.

##### 8. gulp server

Runs **nodemon**.

##### 9. gulp open

If the *--browse* flag is sent, opens the project on a new window.

## Test

##### Environment

In order to run the test suite, you'll need Karma

1. Karma - *npm install -g karma-cli*

##### gulp test

* *noflag*
  * continuously runs the test suite on every client JS change
* *--once*
  * runs the test suite only once

## API

Can be accessed via the */api* access path.

### Users

#### /users

**GET**
```
GET /api/users HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache
```

**POST**
```
POST /api/users HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache

{
    "firstName": "Test",
    "lastName": "User",
    "email": "test.user@nookie.com",
    "password": "secretPass",
    "role": 0
}
```

**PUT**
```
PUT /api/users HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache

{
    "firstName": "Test",
    "lastName": "User",
    "email": "test.user@nookie.com",
    "password": "secretPass",
    "role": 0
}
```

#### /users/:id

**GET**
```
GET /api/users/123123 HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache
```

**DELETE**
```
DELETE /api/users/123123 HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache
```

#### /users/search/:input

**GET**
```
GET /api/users/search/testuser HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache
```

### Stats

#### /stats/users/number

**GET**
```
GET /api/stats/users/number HTTP/1.1
Content-Type: application/json
Cache-Control: no-cache
```
