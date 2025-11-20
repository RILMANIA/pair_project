const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

// Middleware cek login bisa ditaruh di sini nanti
// const authMiddleware = ...

router.get('/', Controller.listServices);
router.get('/add', Controller.addServiceForm); // Harus di atas /:id
router.post('/add', Controller.createService);
router.get('/:id', Controller.serviceDetail);

// Nanti tambah route Buy/Order di sini
router.post('/:id/buy', Controller.buyService);

module.exports = router;