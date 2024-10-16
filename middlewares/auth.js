const auth = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  if (!token) {
    return next(new UnauthorizedError("No token provided"));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // Verifies token validity
  } catch (err) {
    return next(new UnauthorizedError("Invalid token provided"));
  }

  req.user = payload;  // Attach payload to request object

  return next();  // Proceed to the next middleware/route
};

module.exports = auth;