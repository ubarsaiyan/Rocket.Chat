Package.describe({
  name: 'rocketchat:blockstack',
  version: '0.0.0',
  summary: 'Auth handler and utilities for Blockstack',
  git: ''
})

Package.onUse((api) => {

  api.use([
    'modules',
    'ecmascript',
    'less',
    'localstorage',
    'url'
  ])

  api.use([
    'http',
    'accounts-base'
  ], ['client', 'server'])

  api.use([
    'rocketchat:lib',
    'meteorhacks:picker',
    'routepolicy',
    'service-configuration',
    'webapp'
  ], 'server')

  api.use([
    'aldeed:template-extension@4.1.0',
    'kadira:flow-router',
    'templating',
    'less',
    'reload'
  ], 'client')

  api.addAssets([
    'assets/blockstack_mark.png'
  ], 'client')

  api.addFiles([
    'server/main.js',
    'server/routes.js',
    'server/settings.js',
    'server/tokenHandler.js',
    'server/userHandler.js',
    'server/loginHandler.js'
  ], 'server')

  api.addFiles([
    'client/main.js',
    'client/routes.js',
    'client/stylesheets/blockstackLogin.less',
    'client/views/blockstackLogin.html',
    'client/views/blockstackLogin.js'
  ], 'client')

})
