# Azure Search Angular Demo Application
> Angular App using Node.js to demonstrate common Azure Search features

## Getting Started
This web application requires Grunt `~0.4.0` and Node Package Manager
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
If you haven't used [Node](http://nodejs.org/) before, be sure to visit the site to install the Node.js JavaScript engine and the Node Package Manager (npm).

## Installing App Dependencies
It's simple to get started with this app, first use the Node Package Manager to install all server dependencies:
```shell
npm install
```
Now we can use bower to install all front-end dependencies:
```shell
bower install
```
Once the front-end and server depencies are installed, update your config.json file in the root of the project with values from your Azure Search instance:
```json
{
    "SearchAdminKey": "6DA0A49D6D6B05FB462B90D1E9861EC4",
    "SearchQueryKey": "72C3BBF7CAC4EE835BC29C673D1E23B0",
    "SearchServiceName": "sidney",
    "SearchServiceIndexName": "primary",
    "ApiVersion": "2014-10-20-Preview"
}
```
Finally, use Grunt to generate the front-end files and run the web application using Node as the server:
```shell
grunt
```

##Application
This application is a simple paginated grid that uses [AngularJs](https://angularjs.org/).The application connects to [Azure Search](http://azure.microsoft.com/en-us/documentation/services/search/) and takes advantage of many of the preview features including suggestions, pagination and tag boosting.

## Features
This application makes use of multiple grunt plugins including:
- [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon): This plugin launches and runs Node as a task within Grunt.
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): This plugin watches the CSS, HTML and JS files within the **dev** folder and rebuilds the project anytime a file is changed (and saved).
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent): This plugin runs the above two plugins concurrently so that the web server can run while the files are watched.
- [grunt-bower](https://github.com/curist/grunt-bower): This plugin copies files from the Bower components folder to our destination web folder.
- [grunt-bower-concat](https://github.com/sapegin/grunt-bower-concat): This plugin concatenates js and css files from Bower components into a single file for the destination web folder.
- And many more including [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy), [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat), [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify), [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) and [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin).

## Build
So what exactly is going on when I build this project with Grunt?

##### Build Steps
1. The config.json file is parsed and it's values are injected into the **dev/js/angular/config.js** and **data/index.json** files
2. The search index is created in your subscription and 407 documents are uploaded to the index
3. All **dev/js** and **dev/css** files are concatenated, minified and then copied to the web folders
4. HTML files are copied from the **dev/html** folder to the web folders
5. Bower components are copied to the web folders
6. Temp folders are cleaned up
7. The Node server and the grunt file watchers are ran concurrently.  The file watcher will restart the Node server anytime you update a HTML, CSS or JS file in the dev folders.

##### Grunt Tasks
- You can simply generate the example data and search index using the **generate** task.  This is idempotent and can be ran as many times as you wish:
```shell
grunt generate
```
- You can also just generate the web files (build) without launching Node or the grunt watcher:
```shell
grunt build
```

## Credit
- Theme is sourced from [Bootswatch](http://bootswatch.com/)
- Example data is sourced from [AdventureWorksLT](http://msftdbprodsamples.codeplex.com/wikipage?title=AWLTDocs)

![Creative Commons Attribution 4.0 International License](https://i.creativecommons.org/l/by/4.0/88x31.png)
This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
