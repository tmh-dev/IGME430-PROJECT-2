const models = require('../models');

const { Account } = models;

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to cover some security flaws
  const email = `${req.body.email}`;
  const password = `${req.body.password}`;

  if (!email || !password) {
    return res.status(401).json({
      error: 'All fields are required.',
    });
  }

  return Account.AccountModel.authenticate(email, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username or password',
      });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({
      redirect: '/app',
    });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.email = `${req.body.email}`;
  req.body.pass1 = `${req.body.pass1}`;
  req.body.pass2 = `${req.body.pass2}`;


  if (!req.body.email || !req.body.pass1 || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  if (req.body.pass1.trim() !== req.body.pass2.trim()) {
    return res.status(400).json({
      error: 'Passwords do not match.',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass1, async (salt, hash) => {
    const accountData = {
      email: req.body.email,
      salt,
      password: hash,
    };

    const account = new Account.AccountModel(accountData);

    try {
      const newAccount = await account.save();
      req.session.account = Account.AccountModel.toAPI(newAccount);
      // res.json({ redirect: '/api/app' });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          error: 'Email already in use.',
        });
      }
    }
    return res.status(400).json({
      error: 'An error occurred',
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  req.body.pass1 = `${req.body.pass1}`;
  req.body.pass2 = `${req.body.pass2}`;


  if (!req.body.pass1 || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  if (req.body.pass1.trim() !== req.body.pass2.trim()) {
    return res.status(400).json({
      error: 'Passwords do not match.',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass1, async (salt, hash) => {
    const update = {
      password: hash,
      salt,
    };

    Account.AccountModel.changePassword(req.session.account.email, update, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }

      return res.json({ message: `Password was updated for account with email ${doc.email}` });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports = {
  login,
  logout,
  signup,
  getToken,
  changePassword,
};
