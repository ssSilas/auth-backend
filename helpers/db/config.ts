export default () => ({
  portApp: process.env.PORT_APLICATION || 3000,
  secretKey: process.env.SECRET_KEY,
  durationToken: process.env.DURATION_TOKEN,
  salt: process.env.PASS_SALT,
  database: {
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    pass: process.env.DATA_BASE_PASSWORD,
    port: parseInt(process.env.PORT, 10),
    dbManagerName: process.env.DATA_BASE_MANAGER,
    dbClientNameDefault: process.env.DATA_BASE_NAME_DYNAMIC_DEFAULT,
    dialect: process.env.DATA_BASE_DIALECT,
  },
  //s3
  keyid: process.env.ACCESS_KEY_ID,
  accessKey: process.env.SECRET_ACCESS_KEY,
  bucket: process.env.BUCKET
});