import * as logger from 'firebase-functions/logger';
import { MongoConnection } from '../models/connection';
import { onRequest } from 'firebase-functions/v2/https';
import { ALLOWED_SDK_CORS, CLIENT_KEY, SESSION_ID } from '../utils';
import {
  validateCompanyCors,
  validateRequestSchema,
  validateRequiredData,
} from '../validations';
import { CustomError } from '../errors';
import SnapshotModel from '../models/snapshot.model';

const mongoConn = new MongoConnection();

export const gather = onRequest(
  {
    timeoutSeconds: 10,
    maxInstances: 10,
    secrets: ['MONGO_DB_USER', 'MONGO_DB_PASSWORD'],
    cors: ALLOWED_SDK_CORS,
  },
  async (req, res) => {
    try {
      await mongoConn.init();

      validateRequestSchema(req.body);

      // Body
      const {
        location: coordinates,
        [SESSION_ID]: sessionIdFromBody,
        [CLIENT_KEY]: clientKeyFromBody,
        eventType,
        clicks,
        timeOnApp,
        navigations,
        browserInformation,
      } = req.body;

      // Headers
      const {
        ['X-Forwarded-For']: clientIp,
        [SESSION_ID]: sessionIdFromHeader,
        [CLIENT_KEY]: clientKeyFromHeader,
      } = req.headers;

      const sessionId = sessionIdFromHeader || sessionIdFromBody;
      const clientKey = clientKeyFromHeader || clientKeyFromBody;

      validateRequiredData({ sessionId, clientKey });

      const companyConfig = await validateCompanyCors(clientKey, req);

      /* ====== Create snapshot=======  */
      await SnapshotModel.create({
        sessionId,
        location: {
          type: 'Point',
          coordinates: coordinates,
        },
        ip: clientIp,
        eventType,
        clicks,
        timeOnApp,
        navigations,
        companyConfig: companyConfig._id,
        browserInformation,
      }).catch((err) => {
        throw new CustomError(
          `Error with session: ${sessionId}, Error: ${err?.message}`,
          400,
        );
      });

      logger.info(
        { message: `Session created: ${sessionId}` },
        { structuredData: true },
      );

      res.send('Data saved');
      return;
    } catch (error) {
      res.status(error?.status || 500).send(error?.message);
      return;
    }
  },
);
