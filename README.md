RobotlegsJS Phaser TypeScript Boilerplate
===

This template is a modified version of this repository: https://github.com/joshuamorony/phaser-es6-boilerplate

It has been modified to use TypeScript instead of ES6 and to integrate RobotlegsJS.

And is set up to auto resize to cover the entire available viewport. It also includes a service worker and manifest file for progressive web app support.

# Phaser TypeScript Boilerplate

This is a non-professional Phaser template for building standard games using the Phaser framework and RobotlegsJS.

The original idea was to create a small project that contained a robust gulpfile, 
a basic example and *some* kind of folder structure.

## Features

✔ Heavily commented, flexible Gulpfile (that means it uses [Gulp](http://gulpjs.com/)).

✔ [TypeScript](https://www.typescriptlang.org/).

✔ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS).

✔ [Browsersync](http://www.browsersync.io/) = Livereload + Mobile debugging with [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/).

✔ Example: Extending Phaser & modular development.

## Why?

TypeScript [provides advanced autocompletion, navigation, and refactoring](https://vsavkin.com/writing-angular-2-in-typescript-1fa77c78d8e8)!

## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone git@github.com:RobotlegsJS/RobotlegsJS-Phaser-Boilerplate.git`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`.
Your TypeScript code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your TypeScript code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

### Modifying `gulpfile.js`

See [gulpfile.md](gulpfile.md)

## Contributing

Please report any bugs or add requests on [GitHub Issues](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-Boilerplate/issues).

## License

[MIT](LICENSE)
