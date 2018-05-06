# tree

> Family tree UI

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# configs
```
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  port: ,
  host: '"0.0.0.0"',
  awsProfilesApi: '""', // api
  googleAuth: '/../../../config/googleAuth.json', //service level google auth settins to read google spreadsheet data
  sheet_family_profiles: '' // sheet id
})
```
