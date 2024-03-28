const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    // Handle the case where the token is not present, such as when accessing URL directly
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  // Splitting the token and verifying it
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.log('Invalid token format');
    return res.status(401).json({ message: 'Invalid token format' });
  }
  jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Failed to authenticate token');
      return res.status(403).json({ message: 'Failed to authenticate token', error: err.message });
    }
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
