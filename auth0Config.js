// config/auth0Config.js
const isDev = process.env.NODE_ENV === 'development';

export const auth0Domain = 'YOUR_AUTH0_DOMAIN';
export const auth0ClientId = 'YOUR_AUTH0_CLIENT_ID';
export const redirectUri = isDev
  ? 'https://dev.yourdomain.com/callback'
  : 'https://*.yourdomain.com/callback';
