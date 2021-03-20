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

    server.get('/beneficiaries/:id', async (req, res, next) => {
        try {
            const beneficiariy = await Beneficiary.findById(req.params.id);
            res.send(beneficiariy);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`));
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
    });
        

    // Create a beneficiary
    server.put('/beneficiaries/:id', async(req, res, next) => {
        // Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError(("Expects'application/json'")));
        }

        try {
            const beneficiary = await Beneficiary.findOneAndUpdate({_id : req.params.id}, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`));
        }
    })

    // Delete a beneficiary
    server.del('/beneficiaries/:id', async(req, res, next) => {
        // Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError(("Expects'application/json'")));
        }

        try {
            const beneficiary = await Beneficiary.findOneAndRemove({_id : req.params.id});
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`));
        }
    })
}   