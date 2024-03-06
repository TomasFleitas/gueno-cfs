import mongoose from './connection';

const companyConfig = new mongoose.Schema({
  clientKey: {
    type: String,
    trim: true,
  },
  cors: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

companyConfig.index({ clientKey: 'text' });

const CompanyConfigModel = mongoose.model('CompaniesConfig', companyConfig);

export default CompanyConfigModel;
