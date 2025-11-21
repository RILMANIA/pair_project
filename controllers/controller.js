const { Category, Service, User, Profile } = require('../models/index');
const { Op } = require('sequelize');

class Controller {

    //! Landing Page (Home)
    static async home(req, res) {
        try {

            const services = await Service.findHome();
            res.render('homePage', { services });
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! List Services (Halaman Katalog Jasa)
    static async listServices(req, res) {
        try {

            console.log(req.query);

            const { search } = req.query;
            let data = await Service.findAll({
                include: Category
            })

            if (search) {
                data = await Service.findAll({
                    include: {
                        model: Category
                    },
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
            }

            //res.send(data)
            res.render('listServices', { data })
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Detail Service (Untuk memesan)
    static async serviceDetail(req, res) {
        try {
            const { id } = req.params;
            const service = await Service.findByPk(id, { include: Category });

            const UserId = req.session.user.id;
            let user = await User.findByPk(UserId)

            if (!service) {
                const error = "Service not found";
                return res.redirect(`/services?error=${error}`);
            }

            res.render('detailServices', { service, user });
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Admin: Add Service Form
    static async addServiceForm(req, res) {
        try {
            const categories = await Category.findAll();
            res.render('addService', { categories });
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Admin: Create Service (POST)
    static async createService(req, res) {
        try {
            const { name, description, price, CategoryId } = req.body;

            let imgPath = 'https://via.placeholder.com/300'; // Default

            if (req.file) {
                imgPath = `/uploads/${req.file.filename}`;
            }

            await Service.create({
                name,
                description,
                price,
                imgUrl: imgPath,
                CategoryId
            });

            res.redirect('/services');

        }

        catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(el => el.message);
                res.send(errors); // Nanti ganti dgn redirect error
            } else {
                res.send(error.message);
            }
        }
    }

    static async deleteService(req, res){
        try {

            const { id } = req.params;
            await Service.destroy({
                where: {
                    id: id
                }
            })

            res.redirect('/services')
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;