// export const DATA_BASE_CONFIGURATION = {
//   mongoConnectionString: `mongodb://admin:admin@localhost:27017`,
// };

export const Configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10) || 3000,
});
