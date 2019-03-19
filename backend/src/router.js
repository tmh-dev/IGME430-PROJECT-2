const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  // main app routes
  app.post('/api/login', controllers.Account.login);
  app.post('/api/signup', controllers.Account.signup);
  app.get('/api/logout', controllers.Account.logout);
};

module.exports = router;
