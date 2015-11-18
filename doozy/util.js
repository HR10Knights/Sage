var util = {
  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }
    
    try {
      // decode token and attach user to request
      // for use inside controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch(error) {
      return next(error);
    }
  }
}

module.exports = util;