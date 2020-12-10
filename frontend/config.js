import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://blog.com' : publicRuntimeConfig.API_DEV;
export const APP_NAME = publicRuntimeConfig.APP_NAME;