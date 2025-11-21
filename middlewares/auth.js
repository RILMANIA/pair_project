// Middleware 1: Cek apakah user SUDAH login
const isLoggedIn = (req, res, next) => {

    if (!req.session.userId) {
        const error = "Please login first";
        return res.redirect(`/login?error=${error}`);
    }

    next();
};

const isNotLoggedIn = (req, res, next) => {

    if (req.session.userId) {
        return res.redirect(`/services`);
    }

    next();
};

// Middleware 2: Cek apakah user adalah ADMIN (Authorization)
const isAdmin = (req, res, next) => {
    if (req.session.role === 'Admin') {
        next();
    } else {
        const error = "You have no access";
        return res.redirect(`/?error=${error}`);
    }
};

module.exports = { isLoggedIn, isAdmin, isNotLoggedIn };