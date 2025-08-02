module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'defaultAdminSecret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'defaultApiTokenSalt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'defaultTransferTokenSalt'),
    },
  },
});