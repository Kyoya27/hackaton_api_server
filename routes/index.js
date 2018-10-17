const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/menu', require('./menu')),
  app.use('/admin', require('./admin')),
  app.use('/product', require('./product')),
  app.use('/promotion', require('./promotion')),
  app.use('/command', require('./command'))
};

module.exports = RouteManager;
