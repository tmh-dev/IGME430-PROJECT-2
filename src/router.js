const controllers = require('./controllers');
// const middleware = require('./middleware');

const router = (app) => {
  // main app routes
  app.post('/api/login', controllers.Account.login);
  app.post('/api/signup', controllers.Account.signup);
  app.get('/api/logout', controllers.Account.logout);
  app.get('/api/getToken', controllers.Account.getToken);
  // app
  app.get('/api/getBoards', controllers.Board.getBoards);
  app.post('/api/makeBoard', controllers.Board.makeBoard);
  app.post('/api/makeStory', controllers.Story.makeStory);
  app.get('/api/getStories', controllers.Story.getStories);
};

module.exports = router;
