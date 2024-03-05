import { Type, Static } from '@sinclair/typebox';

export const sesisonBodySchema = Type.Object({
  location: Type.Optional(Type.Array(Type.Number())),
  'session-id': Type.Optional(Type.String()),
  eventType: Type.Optional(Type.String()),
  clicks: Type.Optional(
    Type.Array(
      Type.Object({
        elementType: Type.Optional(Type.String()),
        id: Type.Optional(Type.String()),
        title: Type.Optional(Type.String()),
        className: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
        value: Type.Optional(Type.String()),
      }),
    ),
  ),
  timeOnApp: Type.Optional(Type.Number()),
  navigations: Type.Optional(Type.Array(Type.Any())),
  browserInformation: Type.Optional(
    Type.Object({
      name: Type.Optional(Type.String()),
      version: Type.Optional(Type.String()),
      platform: Type.Optional(Type.String()),
      osType: Type.Optional(Type.String()),
    }),
  ),
});

export type TSessionBodySchema = Static<typeof sesisonBodySchema>;
