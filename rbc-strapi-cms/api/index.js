let instance;

module.exports = async (req, res) => {
  try {
    if (!instance) {
      // Set NODE_ENV to production for Vercel
      process.env.NODE_ENV = 'production';
      
      // Set required environment variables with defaults
      process.env.APP_KEYS = process.env.APP_KEYS || 'key1,key2,key3,key4';
      process.env.JWT_SECRET = process.env.JWT_SECRET || 'defaultJwtSecret';
      process.env.ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'defaultAdminJwtSecret';
      process.env.API_TOKEN_SALT = process.env.API_TOKEN_SALT || 'defaultApiTokenSalt';
      process.env.TRANSFER_TOKEN_SALT = process.env.TRANSFER_TOKEN_SALT || 'defaultTransferTokenSalt';
      
      // Dynamic import for Strapi ES module
      const { default: strapi } = await import('@strapi/strapi');
      
      // Initialize Strapi
      instance = strapi({ 
        distDir: './dist',
        appDir: process.cwd()
      });
      
      await instance.load();
    }
    
    return instance.server.app(req, res);
  } catch (error) {
    console.error('Strapi initialization error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      details: error.toString(),
      type: typeof error
    });
  }
};