const homeCtrl = {};

 homeCtrl.getHomePage = (req, res, next) => {
    res.render('home')
};

module.exports = homeCtrl;
