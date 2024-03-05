import { Schema, Validator, ValidatorResult } from 'jsonschema';
import { TSchema } from '@sinclair/typebox';

export const validateRequest = <T extends TSchema>(
  body: unknown,
  schema: T
): ValidatorResult => {
  const validator = new Validator();
  return validator.validate(body, <Schema>schema);
};
