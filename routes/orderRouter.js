const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth');
const OrderController = require('../controllers/orderController');

router.use(isLoggedIn); 

router.get('/history', OrderController.orderHistory); // Halaman Riwayat
router.post('/create', OrderController.createOrder);  // Proses Pesan
router.get('/:id/cancel', OrderController.cancelOrder); // Batal Pesan

module.exports = router;