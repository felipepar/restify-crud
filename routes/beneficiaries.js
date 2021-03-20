const errors = require('restify-errors');
const Beneficiary = require('../models/Beneficiary')

module.exports = (server) => {
    // Get beneficiaries
    server.get('/beneficiaries', async (req, res, next) => {
        try {
            const beneficiaries = await Beneficiary.find({});
            res.send(beneficiaries);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    })

    // Create a beneficiary
    server.post('/beneficiaries', async(req, res, next) => {
        // Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError(("Expects'application/json'")));
        }

        const {name, cpf, rg, birthDate, planType, dependents} = req.body;
        const beneficiary = new Beneficiary({
            name,
            cpf,
            rg,
            birthDate,
            planType,
            dependents
        });

        try {
            const newBeneficiary = await beneficiary.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
        
    })

}   