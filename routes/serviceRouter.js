const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

const { isLoggedIn, isAdmin } = require('../middlewares/auth');

const upload = require('../helpers/multer');

//! Akses public tanpa login
router.get('/', Controller.listServices);

router.get('/add', isLoggedIn, isAdmin, Controller.addServiceForm);
router.post('/add', isLoggedIn, isAdmin, upload.single('imgUrl'), Controller.createService);

router.get('/:id', isLoggedIn, Controller.serviceDetail);
router.get('/:id/delete', isLoggedIn, isAdmin, Controller.deleteService)

module.exports = router;