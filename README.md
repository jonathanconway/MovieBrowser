# MovieBrowser

[MovieBrowser](https://MovieBrowser.herokuapp.com) is a small isomorphic ([universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)) web application featuring a browsable list of movies.

It is built on [express](http://expressjs.com) using [React](https://facebook.github.io/react) and [Flux](https://facebook.github.io/flux) with [yahoo/fluxible](http://fluxible.io). It is developed with [webpack](http://webpack.github.io) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) and written with [babeljs](http://babeljs.io) with the help of [eslint](http://eslint.org). It supports multiple languages using [react-intl](http://formatjs.io/react/).

<a href="https://jonathanconway-moviebrowser.herokuapp.com"><img src="https://cloud.githubusercontent.com/assets/120693/7737327/95f3de1c-ff4a-11e4-86fb-e9d3cabcdedb.png" width="700"></a>

[![Build Status](https://travis-ci.org/jonathanconway/MovieBrowser.svg?branch=master)](https://travis-ci.org/jonathanconway/MovieBrowser) <img src="https://david-dm.org/jonathanconway/MovieBrowser.svg">

This project is based on the [Isomorphic500](https://github.com/gpbl/isomorphic500) demo. The intent is to demonstrate my experience/competency with refactoring and modifying React and Flux code.

- see the demo on [MovieBrowser.herokuapp.com](https://MovieBrowser.herokuapp.com) (with source maps!)
- clone this repo and run the server to confirm it is actually working
- edit a react component or a css style, and see the updated app as you save your changes!
- read on for some technical details

**Clone this repo**

**Note** This app has been tested on node 4

```
git clone https://github.com/jonathanconway/MovieBrowser.git
cd MovieBrowser
npm install
```

**Start the app**

```bash
npm run dev
```

and open [localhost:3000](http://localhost:3000).

You can also try the built app:

```bash
npm run build   # First, build for production
npm run prod    # then, run the production version
```

then open [localhost:8080](http://localhost:8080).

> If you are starting the server on Windows, please read https://github.com/gpbl/isomorphic500/issues/58


## Table of Contents

* [Application structure](#application-structure)
  * [The fluxible app](#the-fluxible-app)
  * [Async data](#async-data)
  * [Router](#router)
  * [Stores](#stores)
    * [The HtmlHeadStore](#the-htmlheadstore)
* [Internationalization (i18n)](#internationalization-i18n)
  * [How the user’s locale is detected](#how-the-user’s-locale-is-detected)
  * [Setting up react-intl](#setting-up-react-intl)
  * [Internationalization, the flux way](#internationalization-the-flux-way)
  * [Sending the locale to the API](#sending-the-locale-to-the-api)
* [Development](#development)
  * [nodemon](#nodemon)
  * [Webpack](#webpack)
  * [Babeljs](#babeljs)
  * [.editorconfig](#editorconfig)
  * [Linting](#linting)
  * [Debugging](#debugging)
* [Testing](#testing)

## Application structure

```bash
.
├── index.js            # Starts the express server and the webpack dev server
├── config              # Contains the configuration for dev and prod environments
├── nodemon.json        # Configure nodemon to watch some files
├── src
│   ├── app.js          # The fluxible app
│   ├── client.js       # Entry point for the client
│   ├── config.js       # Config loader (load the config files from /config)
│   ├── routes.js       # Routes used by fluxible-router
│   ├── server.js       # Start the express server and render the routes server-side
│   │
│   ├── actions         # Fluxible actions
│   ├── components      # React components
│   ├── constants       # Constants
│   ├── containers      # Contains React containers components
│   │   ├── ...
│   │   ├── Html.js     # Used to render the <html> document server-side
│   │   └── Root.js     # Root component

│   ├── intl            # Contains the messages for i18n
│   ├── server          # Server-side only code
│   │   ├── ga.js              # Google Analytics script
│   │   ├── intl-polyfill.js   # Patch node to support `Intl` and locale-data
│   │   ├── render.js          # Middleware to render server-side the fluxible app
│   │   └── setLocale.js       # Middleware to detect and set the request's locale
│   ├── services        # Fetchr services
│   ├── stores          # Fluxible stores
│   ├── style           # Contains the Sass files
│   └── utils         
│       ├── CookieUtils.js         # Utility to write/read cookies 
│       ├── IntlComponents.js      # Exports wrapped react-intl components
│       ├── IntlUtils.js           # Utilities to load `Intl` and locale-data
│       ├── connectToIntlStore.js  # Connects react-intl components with the IntlStore
│       ├── getIntlMessage.js      # Get react-intl messages
│       └── trackPageView.js       # Track a page view with google analitics
├── static              
│   ├── assets         # Static files
│   ├── json           # JSON data file (in future, could utilise a web-service rather than JSON)
│   └── dist           # Output files for webpack on production
└── webpack
    ├── dev.config.js  # Webpack config for development
    ├── prod.config.js # Webpack config for building the production files
    └── server.js      # Used to starts the webpack dev server

```

### The fluxible app

The [src/app](src/app) file is the core of the Fluxible application:

- it configures Fluxible with [src/containers/Root.js](src/containers/Root.js) as the root component.
- it registers the stores so they can work on the same React context
- it adds the [fetchr plugin]((https://github.com/yahoo/fluxible-plugin-fetchr)), to share the same API requests both client and server-side
- it makes possible to dehydrate the stores [on the server](src/server/render.js) and rehydrate them [on the client](src/client.js)

### Async data

I used [Fetchr](https://github.com/yahoo/fetchr) and [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).
[Fetchr services](src/services) run only on server and utilise data from a hard-coded JSON file.

### Router

This app uses [fluxible-router](https://github.com/yahoo/fluxible-router) for routing. Fluxible-router works pretty well in fluxible applications since it follows the flux paradigm. The [Application component](src/containers/Root.js) uses the `@handleHistory` decorator to bind the router to the app.

### Stores

Instead of directly listening to stores, components use fluxible's `@connectToStores` decorator: a store state is passed to components as prop. See the [HomePage](src/containers/HomePage.js).

`connectToStore` can also "consume" store data without actually listening to any store. This is the case with [LocaleSwitcher](src/components/LocaleSwitcher.js).

#### The HtmlHeadStore

The [HtmlHeadStore](src/stores/HtmlHeadStore.js) is a special store used to set the `<head>` meta-tags in the `Html` component, during server-side rendering. It is also listened by the `Application` component to change the browser's `document.title`.

This store listens to route actions and set its content according to the current route. It can also get data from other stores or the localized messages from the `IntlStore`.

## Internationalization (i18n)

To give an example on how to implement i18n in a React application, MovieBrowser supports English, [Italian](https://www.youtube.com/watch?v=9JhuOicPFZY), Portuguese and French.

This app adopts [React Intl](http://formatjs.io/react/), which is a solid library for this purpose.

### How the user’s locale is detected

The app sniffs the browser's `accept-language` request header. The [locale](https://github.com/jed/locale) npm module has a nice express middleware for that. Locales are restricted to those set in the app's [config](../config).

The user may want to override the detected locale: the [LocaleSwitcher](src/components/LocaleSwitcher.js) component set a cookie when the user chooses a language. Also, we enable the `?hl` parameter in the query string to override it. Server-side, cookie and query string are detected by the [setLocale](src/server/setLocale.js) middleware.

### Setting up react-intl

React-intl requires some boilerplate to work properly. Difficulties here arise mainly for two reasons:

1. React Intl relies on the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) *global* API, not always available on node.js or some browsers (e.g. Safari). Luckly there's an [Intl polyfill](https://www.npmjs.com/package/intl): on the server we can just "require" it – however on the browser we want to download it *only* when `Intl` is not supported.

2. For each language, we need to load a set of *locale data* (used by `Intl` to format numbers and dates) and the translated strings, called *messages* (used by `react-intl`). While on node.js we can load them in memory, on the client they need to be downloaded first – and we want to download only the relevant data for the current locale.

**On the server** the solution is easy: as said, the server [loads a polyfill](src/server/intl-polyfill) including both `Intl` and the locale data. For supporting the browser, we can instead rely on our technology stack, i.e. flux and webpack.

**On the client**, we have to load the `Intl` polyfill and its locale data *before* rendering the app, i.e. in [client.js](src/client.js).

For this purpose, I used webpack's `require.ensure()` to split `Intl` and localized data in multiple chunks. Only after they have been downloaded, the app can be mounted. See the `loadIntlPolyfill()` and `loadLocaleData()` functions in [IntlUtils](src/utils/IntlUtils.js): they return a promise that is resolved when the webpack chunks are downloaded and `require`d.

They are used in [client.js](client.js) before mounting the app.

> **Important**: since `react-intl` assumes `Intl` is already in the global scope, we can't import the fluxible app (which imports react-intl in some of its components) *before* polyfilling `Intl`. That's why you see in [client.js](src/client.js) `require("./app")` inside the in the `renderApp()` function, and not as `import` on the top of the file.

## Development

Run the development version with

```
npm run dev
```

### nodemon

This task runs the server with [nodemon](https://github.com/remy/nodemon). Nodemon will restart the server when some of the files specified in [its config](nodemon.json) change.

### Webpack

Webpack is used as commonjs module bundler, css builder (using sass-loader) and assets loader (images and svg files).

The [development config](./webpack/dev.config.js) enables source maps, the [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/). It loads CSS styles with `<style>`, to enable styles live reload). This config is used by the [webpack-dev-server](webpack/server.js), serving the files bundled by Webpack.

> This config uses the [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)
> plugin. To get notified on errors while compiling the code, on Mac you must `brew install terminal-notifier`.

The [production config](./webpack/prod.config.js) builds the client-side production bundle from `npm run build`.

Both configs set a `process.env.BROWSER` global variable, useful to require CSS from the components, e.g:

```js
// MyComponent
if (process.env.BROWSER) {
  require('../style/MyComponent.scss');
}
```

On production, files bundled by webpack are hashed. Javascript and CSS file names are saved in a `static/dists/stats.json` which is read by the [Html](src/containers/Html.js) component.

### Babeljs

This app is written in Javascript-[Babel](https://babeljs.io/). Babel config is in [.babelrc](.babelrc) (it only enables class properties). On Sublime Text, I installed [babel-sublime](https://github.com/babel/babel-sublime) to have full support of the Babel syntax!

### .editorconfig

The [.editorconfig](.editorconfig) file can be used with your IDE/editor to mantain a consistent coding style. See [editorconfig.org](http://editorconfig.org) for more info. (thanks to @lohek)

### Linting

I use [eslint](http://eslint.org) with [babel-eslint](https://github.com/babel/babel-eslint) and the [react plugin](https://github.com/yannickcr/eslint-plugin-react). I also configured Sublime Text with [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint).

I use the rules from my own [eslint-config-jonathanconway](https://github.com/jonathanconway/eslint-config-jonathanconway) shared configs.

```bash
npm run lint
```

I use [SublimeLinter-scss-lint](https://github.com/attenzione/SublimeLinter-scss-lint) for linting the Sass files ([.scss-lint.yml](.scss-lint.yml)) (only with Sublime Text).

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable the logging from Node by setting the `DEBUG` environment variable before running the server:

```bash
# enable logging for MovieBrowser and Fluxible
DEBUG=MovieBrowser,Fluxible node index

# disable logging
DEBUG= node index
```

From the **browser**, you can enable/disable them by sending this command in the JavaScript console:

```js
debug.enable('MovieBrowser')
debug.disable()
// then, refresh!
```

## Testing

Unit testing is done with [Mocha](https://github.com/mochajs/mocha), with [Sinon](https://github.com/sinonjs/sinon) used for spies and [React Test Utils](https://facebook.github.io/react/docs/test-utils.html) used to test React components.

Not all components have been unit-tested, due to time-constraints.

In a production scenario, I would measure test coverage and ensure that at least 90% coverage was achieved.