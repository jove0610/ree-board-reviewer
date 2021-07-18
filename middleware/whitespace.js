module.exports = function whitespace(req, res, next) {
  const { username } = req.body;

  if (username.includes(' ')) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'Username cannot have blank space' }] });
  }

  next();
};
