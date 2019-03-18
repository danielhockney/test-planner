const LoginRouter = require('./LoginRouter');
const RegisterRouter = require('./RegisterRouter');
const UsersRouter = require('./UsersRouter');
const HistoryRouter = require('./HistoryRouter');

class Api {
  constructor() {

  }

  initializeApp(app){
    app.use('/', LoginRouter);
    app.use('/login', LoginRouter);
    app.use('/register', RegisterRouter);
    app.use('/users', UsersRouter);
    app.use('/history', HistoryRouter);

    app.use('/test', (req, res) => {
      res.send('All is ok');
    });
  }
}

module.exports = new Api();
