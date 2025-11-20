const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');
const session = require('express-session');

class UserController {

    //! Form Register
    static registerForm(req, res) {
        try {
            res.render('register')
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Proses Register
    static async register(req, res) {
        try {

            const { username, email, password, role } = req.body;

            // Buat user baru
            const newUser = await User.create({ username, email, password, role });
            console.log(newUser);


            // Otomatis buat Profile kosong untuk user tersebut (1:1)
            await Profile.create({ UserId: newUser.id });

            res.redirect('login');
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Form Login
    static async loginForm(req, res) {
        try {
            const { error } = req.query;
            res.render('login', { error });
        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    //! Proses Login
    static async login(req, res) {
        try {

            const { email, password } = req.body;

            // cari user berdasarkan email
            const user = await User.findOne({
                where: {
                    email
                }
            })

            // proses validasi user & password
            if (user) {
                const isValidPW = bcrypt.compareSync(password, user.password)

                if (isValidPW) {

                    req.session.userId = user.id;
                    req.session.role = user.role;
                    req.session.user = { id: user.id, username: user.username, role: user.role };

                    return res.redirect('/');
                }
            }

            const error = "Invalid email or password"
            res.redirect(`login?error=${error}`)
        }

        catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async logout(req, res) {

        // Hapus sesi
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            // Redirect ke login setelah logout
            res.redirect('/login');
        });
    }

    static async showProfile(req, res) {
        try {

            const { userId } = req.session;

            const user = await User.findByPk(userId, {
                include: Profile
            });

            const { msg } = req.query;
            res.render('userProfile', { user, msg });
        }

        catch (error) {
            res.send(error.message);
        }
    }

    static async updateProfile(req, res) {
        try {

            const { userId } = req.session;
            const { fullName, phoneNumber, address } = req.body;

            const profile = await Profile.findOne({ where: { UserId: userId } });

            if (profile) {
                await Profile.update(
                    { fullName, phoneNumber, address },
                    { where: { UserId: userId } }
                )
            }
            else {
                await Profile.create({ fullName, phoneNumber, address, UserId: userId });
            }

            res.redirect('/profile?msg=Profil berhasil diperbarui');
        }

        catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errors = error.errors.map(e => e.message);
                return res.redirect(`/profile?msg=${errors}`);
            }
            res.send(error.message);
        }
    }
}

module.exports = UserController;