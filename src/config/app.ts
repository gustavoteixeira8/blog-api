export const appConfig = {
  serverPort: process.env.SERVER_PORT || 3000,
  url: 'http://localhost:3000',
  name: process.env.APP_NAME as string,
  mail: {
    address: process.env.APP_MAIL as string,
    name: process.env.APP_NAME as string,
  },
};
