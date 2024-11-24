import { ConnectOptions } from 'ottoman/lib/types/ottoman/ottoman';

export function COUCH_CONFIG(): ConnectOptions {
  return {
    username: process.env.COUCH_USERNAME || 'admin',
    password: process.env.COUCH_PASSWORD || 'password',
    bucketName: process.env.COUCH_BUCKET || 'wenex',
    connectionString: process.env.COUCH_HOST || 'couchbase://localhost',
  };
}
