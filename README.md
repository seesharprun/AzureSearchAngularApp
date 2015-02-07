# Azure Search Angular Demo Application
> Angular App using Node.js for Serve demonstrating common Azure Search features

## Getting Started
This web application requires Grunt `~0.4.0` and Node Package Manager
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
If you haven't used [Node](http://nodejs.org/) before, be sure to visit the site to install the Node.js JavaScript engine and the Node Package Manager (npm).

## Installing App Dependencies
It's simple to get started with this app, first use the Node Package Manager to install all dependencies:
```shell
npm install
```
Once the depencies are installed, you can use Grunt to build the front-end libraries, and run the web application using Node:
```shell
grunt
```

##Application
This application is a simple paginated grid that uses [AngularJs](https://angularjs.org/).The application connects to [Azure Search](http://azure.microsoft.com/en-us/documentation/services/search/) and takes advantage of many of the preview features including suggestions, pagination and tag boosting.

## Features
This application makes use of multiple grunt plugins including:
- [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon): This plugin launches and runs Node as a task within Grunt.
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): This plugin watches the CSS, HTML and JS files within the *dev* folder and rebuilds the project anytime a file is changed (and saved).
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent): This plugin runs the above two plugins concurrently so that the web server can run while the files are watched.
- [grunt-bower-task](https://github.com/yatskevich/grunt-bower-task): This plugin copies files from the Bower components folder to our destination web folder.
- [grunt-bower-concat](https://github.com/sapegin/grunt-bower-concat): This plugin concatenates js and css files from Bower components into a single file for the destination web folder.
- And many more including [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy), [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat), [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) and [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
