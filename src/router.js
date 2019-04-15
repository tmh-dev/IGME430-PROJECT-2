const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  // main api routes
  app.post('/api/login', middleware.requiresLogout, controllers.Account.login);
  app.get('/api/logout', controllers.Account.logout);
  app.post('/api/signup', controllers.Account.signup);
  app.get('/api/logout', middleware.requiresLogin, controllers.Account.logout);
  app.post('/api/changePassword', middleware.requiresLogin, controllers.Account.changePassword);
  app.get('/api/getToken', controllers.Account.getToken);
  // app
  app.post('/api/makeStory', middleware.requiresLogin, controllers.Story.makeStory);
  app.delete('/api/deleteStory', middleware.requiresLogin, controllers.Story.deleteStory);
  app.get('/api/getStories', middleware.requiresLogin, controllers.Story.getStories);

  // TODO: nest stories into boards
  // app.post('/api/makeBoard', middleware.requiresLogin, controllers.Board.makeBoard);
  // app.get('/api/getBoards', middleware.requiresLogin, controllers.Board.getBoards);
  // app.delete('/api/deleteBoard', middleware.requiresLogin, controllers.Board.deleteBoard);
};

module.exports = router;
