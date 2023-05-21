const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://localhost:3001',
  'http://192.168.2.200:3001',
  'http://192.168.2.200:3000',
  'https://192.168.2.200:3001',
  'https://192.168.2.200:3000',
  'https://mestogustera.nomoredomains.monster',
  'https://mestogustera-api.nomoredomains.monster',
  'http://mestogustera.nomoredomains.monster',
  'http://mestogustera-api.nomoredomains.monster',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
