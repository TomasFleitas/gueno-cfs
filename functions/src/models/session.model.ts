import mongoose from './connection';

const GeoSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true },
});

const session = new mongoose.Schema({
  location: GeoSchema,
  sessionId: {
    type: String,
    trim: true,
  },
  eventType: {
    type: String,
    trim: true,
  },
  companyConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyConfig',
  },
  clicks: {
    type: [
      {
        elementType: { type: String, trim: true },
        id: { type: String, trim: true },
        title: { type: String, trim: true },
        className: { type: String, trim: true },
        name: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
  },
  ip: {
    type: String,
  },
  timeOnApp: {
    type: Number,
  },
  navigations: {
    type: [String],
  },
  browserInformation: {
    type: {
      name: { type: String, trim: true },
      version: { type: String, trim: true },
      platform: { type: String, trim: true },
      osType: { type: String, trim: true },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

session.index({ createdAt: 1 });
session.index({ sesionId: 'text' });

const SessionModel = mongoose.model('Sessions', session);

export default SessionModel;
