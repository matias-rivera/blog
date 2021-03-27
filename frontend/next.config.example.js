const withCSS = require('@zeit/next-css')

module.exports = withCSS({
    publicRuntimeConfig: {
        APP_NAME: 'BLOG',
        API_DEV: 'http://localhost:5000/api',
        API_PROD: 'http://localhost:5000/api',
        PRODUCTION: false,
        DOMAIN_DEVELOPMENT: 'http://localhost:3000',
        DOMAIN_PRODUCTION: 'http://localhost:3000',
        DISQUS_SHORTNAME: '',
        GOOGLE_CLIENT_ID:'',
    }
})
