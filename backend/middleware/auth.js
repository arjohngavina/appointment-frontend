const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Replace with your actual Cognito user pool region and ID
const REGION = 'us-east-1'; // e.g. us-east-1
const USER_POOL_ID = 'us-east-1_bwHek97ra'; // e.g. us-east-1_abc123
const ISSUER = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;

const client = jwksClient({
  jwksUri: `${ISSUER}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  console.log('📥 Authorization header:', token); // ✅ Debug incoming token

  jwt.verify(token.replace('Bearer ', ''), getKey, {
    issuer: ISSUER,
    algorithms: ['RS256'],
  }, (err, decoded) => {
    if (err) {
      console.error('❌ JWT verification failed:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('✅ Decoded JWT payload:', decoded); // ✅ Debug decoded token

    req.user = decoded; // attach user info to request
    next();
  });
}

module.exports = verifyToken;
