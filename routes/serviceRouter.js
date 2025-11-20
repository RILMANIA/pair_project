const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

const { isLoggedIn, isAdmin } = require('../middlewares/auth');

//! Akses public tanpa login
router.get('/', Controller.listServices);

router.get('/add', isLoggedIn, isAdmin, Controller.addServiceForm);
router.post('/add', isLoggedIn, isAdmin, Controller.createService);

router.get('/:id', isLoggedIn, Controller.serviceDetail);

module.exports = router;