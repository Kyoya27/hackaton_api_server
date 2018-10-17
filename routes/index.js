const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/admin', require('./admin')),
  app.use('/product', require('./product')),
  app.use('/category', require('./category')),
  app.use('/advert', require('./advert'))
};

module.exports = RouteManager;
