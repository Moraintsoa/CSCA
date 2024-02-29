// Définissez les middlewares, tels que redirigerSiconnectee et redirigerSinepasConnectee
exports.redirigerSiconnectee = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
};

exports.redirigerSinepasConnectee = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};
exports.redirigerSiconnecteeadmin = (req, res, next) => {
  if (req.session.adminId) {
    res.redirect('/admin');
  } else {
    next();
  }
};

exports.redirigerSinepasConnecteeadmin = (req, res, next) => {
  if (!req.session.adminId) {
    res.redirect('/admin_login');
  } else {
    next();
  }
};

// Les autres middlewares si nécessaire
