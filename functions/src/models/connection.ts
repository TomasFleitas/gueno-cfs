import { defineSecret } from 'firebase-functions/params';
import mongoose from 'mongoose';
import * as logger from 'firebase-functions/logger';
export class MongoConnection {
  constructor() {}
  async init() {
    const MONGO_DB_USER = defineSecret('MONGO_DB_USER').value();
    const MONGO_DB_PASSWORD = defineSecret('MONGO_DB_PASSWORD').value();

    if (!MONGO_DB_USER || !MONGO_DB_PASSWORD) {
      logger.error('Mongo secrets no provided');
      return;
    }

    const mongoURI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_USER}.z4vlla7.mongodb.net/${process.env.MONGO_DB_NAME}`;

    try {
      if (mongoose.connection.readyState === 1) {
        logger.info('MongoDB already connected');
        return;
      }
      await mongoose.connect(mongoURI);
      logger.info('MongoDB connection established');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
    }
  }
}

export default mongoose;
