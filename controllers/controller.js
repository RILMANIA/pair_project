const { Category, Service, User, Profile } = require('../models/index');
const { Op } = require('sequelize');
const rupiahFormat =require('../helpers/helper')

class Controller{

    //! Landing Page (Home)
    static async home(req,res){
        try {
            res.render('home')
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! List Services (Halaman Katalog Jasa)
    static async listServices(req, res){
        try {
            const data = await Service.findAll({
                include: [Category]
            })

            //res.send(data)
            res.render('serviceList', { data })
            
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Detail Service (Untuk memesan)
    static async serviceDetail(req, res){
        try {
            const { id } = req.params

            const data = await Service.findOne(
                {where: {
                    id: id
                }}
            )

            //res.send(data)
            res.render('serviceDetails', { data, rupiahFormat })
            
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Admin: Add Service Form
    static async addServiceForm(req, res){
        try {
            let data = await Category.findAll({

            })
            res.render('addServiceForm', { data })
            
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Admin: Create Service (POST)
    static async createService(req, res){
        try {
            const { name, description, price ,imgUrl, CategoryId} = req.body

            await Service.create({
                name,
                description,
                price,
                imgUrl,
                CategoryId
            })

            res.redirect('/services')
        } 
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async buyService(req,res){
        try {
            
        } 
        
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;