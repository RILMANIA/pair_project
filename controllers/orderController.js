const { Order, Service, User, Category } = require('../models/index');
const formatDate = require('../helpers/formatDate')

class OrderController {

    //! Proses Pemesanan (Create Order)
    static async createOrder(req, res) {
        try {

            const { ServiceId } = req.body;
            const UserId = req.session.userId;

            const service = await Service.findByPk(ServiceId);

            if (!service) {
                return res.send("Service tidak ditemukan");
            }

            await Order.create({
                date: new Date(),
                status: 'Pending',
                totalPrice: service.price,
                UserId: UserId,
                ServiceId: ServiceId
            });

            res.redirect('/orders/history');
        }

        catch (error) {
            res.send(error.message);
        }
    }

    static async orderHistory(req, res) {
        try {
            const UserId = req.session.userId;

            const orders = await Order.findAll({
                where: { UserId: UserId },
                include: {
                    model: Service,
                    include: Category
                },
                order: [['date', 'DESC']]
            });

            const { deletedOrder, msg } = req.query;

            res.render('orderHistory', { orders, formatDate, deletedOrder, msg });
        }

        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async cancelOrder(req, res) {
        try {

            const { id } = req.params;

            // Cari order dulu untuk pastikan statusnya masih Pending
            const order = await Order.findByPk(id, {
                include: Service
            });

            if (order && order.status === 'Pending') {

                const serviceName = order.Service.name;
                await order.destroy({ where: { id } });

                const msg = `Pesanan ${serviceName} berhasil dibatalkan.`;
                res.redirect(`/orders/history?msg=${msg}&deletedOrder=true`);
            }

            res.redirect('/orders/history');
        }

        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = OrderController;