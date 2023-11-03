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
  
  // Les autres middlewares si nécessaire
  