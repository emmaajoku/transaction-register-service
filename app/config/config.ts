const appName = 'transactionlogger';
// import dotenv from "dotenv";
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  appName,
  environment: process.env.NODE_ENV,
  web: {
    port: parseInt(process.env.APP_PORT),
  },
  logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL,
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
  jwt: {
    issuer: 'transactionlogger'.trim(),
    algorithm: process.env.JWT_ALGORITHM,
    private_key: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    public_key: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'),
  },
  mongo: {
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      debug: process.env.DATABASE_DEBUG || false,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN
        ? parseInt(process.env.DATABASE_POOL_MIN)
        : 2,
      max: process.env.DATABASE_POOL_MAX
        ? parseInt(process.env.DATABASE_POOL_MAX)
        : 2,
    },
  },
  frontend: {
    host: process.env.FRONTEND_URL || null,
  },
  auth: {
    baseurl: '0.0.0.0:8000/v1/' || process.env.AUTH_BASEURL,
    secret: 'AIzaSyB2u-PswM3dNBeByd7Dnql7xMbYbLydrPRTA7YbrzUROVUVgR_tXT7GmVg',
  },
  max_rate_limit_counter: process.env.MAX_RATE_LIMIT_COUNTER || 30,
};
