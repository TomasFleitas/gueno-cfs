import { Request } from 'firebase-functions/v1';
import { BadRequest, Forbidden, NotFound } from '../errors';
import CompanyConfigModel from '../models/companyConfig.model';
import * as requestSchemas from '../requestSchemas';
import { validateRequest } from '../schemaValidator/validators';

export const validateRequiredData = ({ sessionId, secretKey }) => {
  if (!sessionId) throw new BadRequest('sessionId no provided');
  if (!secretKey) throw new BadRequest('secret key no provided');
};

export const validateRequestSchema = (body: Request['body']) => {
  const validation = validateRequest(body, requestSchemas.snapshotBodySchema);
  if (!validation.valid) throw new NotFound(JSON.stringify(validation.errors));
};

export const validateCompanyCors = async (secretKey: string, req: Request) => {
  const companyConfig = await CompanyConfigModel.findOne({ secretKey });
  if (!companyConfig)
    throw new Forbidden(
      `Company config not found for secret key: ${secretKey}`,
    );

  const origin = req.headers.origin;
  if (!companyConfig.cors.includes(origin))
    throw new Forbidden(
      `Origin '${origin}' not allowed for secret key: ${secretKey}`,
    );

  return companyConfig;
};
