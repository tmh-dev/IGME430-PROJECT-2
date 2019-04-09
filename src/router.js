const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  // main app routes
  app.post('/api/login', controllers.Account.login);
  app.post('/api/signup', controllers.Account.signup);
  app.get('/api/logout', middleware.requiresLogin, controllers.Account.logout);
  app.get('/api/getToken', controllers.Account.getToken);
  // app
  app.post('/api/makeStory', middleware.requiresLogin, controllers.Story.makeStory);
  app.delete('/api/deleteStory', middleware.requiresLogin, controllers.Story.deleteStory);
  app.get('/api/getStories', middleware.requiresLogin, controllers.Story.getStories);
};

module.exports = router;
