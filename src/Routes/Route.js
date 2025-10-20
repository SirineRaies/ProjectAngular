module.exports = app => {
    const router = require('express').Router();
    const VoyageController= require('../Controllers/VoyageController');
    router.post('/voyages',VoyageController.upload.single('image'), VoyageController.create);
    router.get('/voyages', VoyageController.findAll);
    router.delete('/voyages/:id', VoyageController.delete);
    router.get('/voyages/:id', VoyageController.findOne);
    router.put('/voyages/:id', VoyageController.update);
    app.use('/', router);
}