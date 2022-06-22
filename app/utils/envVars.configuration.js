const envVars = {
  //   authClientId: process.env.WEB_APP_AD_CLIENT_ID,
  //   authAuthority: process.env.AD_AUTHORITY_URL,
  //   authRedirectURI: process.env.REDIRECT_URI,
  //   domainName: process.env.DOMAIN_NAME,
  //   authPostLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URL,
  doLog: process.env.DO_LOG || true,
  // TODO: Get a dev key for DCentriQ
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
};

export default envVars;
