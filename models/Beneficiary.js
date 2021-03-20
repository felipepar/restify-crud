const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const BeneficiarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true
    },
    rg: {
        type: String,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true,
        trim: true
    },
    planType: {
        type: String,
        required: true,
        trim: true
    },
    dependents: {
        type: Number,
        required: true,
        default: 0
    },
})

BeneficiarySchema.plugin(timestamp);

const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);
module.exports = Beneficiary;