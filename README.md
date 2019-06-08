# Verkehrsunfall Editor Website

This is the React based web editor for crowd sourced crash location correction.

## Backend

See repository [codeformuenster/verkehrsunfaelle](https://github.com/codeformuenster/verkehrsunfaelle). You'll need a populated database & services `kinto`, `random-accident` and `postgres` running.

## Development

### Preparations

- Install [Node.js](http://nodejs.org/) >= 10.16 and [yarn](https://yarnpkg.com/).
- Install depdendencies by running `yarn` in the root of this (`editor-web`) directory.

### Running in development

    yarn start

## Production build

- Run `yarn build`.
- Copy the contents of the `build` directory to your webserver.
- Set up SPA redirects for all paths in `src/index.js`.
