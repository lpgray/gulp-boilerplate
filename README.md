# gulp-boilerplate

A web front-end boilerplate inspired from [grunt version](https://github.com/lpgray/ray-grunt-template).

## Features

- Live reload by Browser-sync
- Build your codes by gulp-rev-all
- Libs management by Bower
- Dynamic include HTML template by gulp-file-includes
- Write by Less
- JavaScript quality validation by jshint (todo)

## How to play

### Get the code

    git clone git@github.com:lpgray/gulp-boilerplate.git

### Copy and Paste

Just copy all files and folders into your project folder

#### You will get the following structure

- /src
    - ./img
    - ./css
    - ./js
    - ./template
    - index.html
- bower.json
- gulpfile.js
- package.json
- README.md

### Run following command

    npm install

    gulp serve

After this, you will get a folder named `serve`, this is the server root path.

### Build your code

    gulp build

You will get a folder named `dist`, well done.

> gulp build command must run after serve.
