import mongoose from './connection';

const companyConfig = new mongoose.Schema({
  secretKey: {
    type: String,
    trim: true,
  },
  cors: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

companyConfig.index({ secretKey: 'text' });

const CompanyConfigModel = mongoose.model('CompaniesConfig', companyConfig);

export default CompanyConfigModel;
