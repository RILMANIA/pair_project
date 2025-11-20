const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/auth');

const Controller = require('../controllers/controller');
const UserController = require('../controllers/userController');


// Route Home
router.get('/', Controller.home);

// Route Auth
router.get('/register', UserController.registerForm);
router.post('/register', UserController.register);

router.get('/login', UserController.loginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

router.get('/profile', isLoggedIn, UserController.showProfile);
router.post('/profile/edit', isLoggedIn, UserController.updateProfile);

const servicesRouter = require('./serviceRouter');
router.use('/services', servicesRouter);

const ordersRouter = require('./orderRouter');
router.use('/orders', ordersRouter)

module.exports = router;