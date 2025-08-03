// ES Module compatibility wrapper for Strapi on Vercel
const path = require('path');
const fs = require('fs');

// Override module resolution for problematic lodash/fp imports
const originalResolveFilename = require.extensions['.js'];
require.extensions['.js'] = function(module, filename) {
  // Handle lodash/fp directory import issue
  if (filename.includes('lodash/fp') && !filename.includes('.js')) {
    const fpPath = path.join(path.dirname(filename), 'fp.js');
    if (fs.existsSync(fpPath)) {
      filename = fpPath;
    }
  }
  return originalResolveFilename.call(this, module, filename);
};

// Set required environment variables
process.env.NODE_ENV = 'production';
process.env.APP_KEYS = process.env.APP_KEYS || 'key1,key2,key3,key4';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'defaultJwtSecret';
process.env.ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'defaultAdminJwtSecret';
process.env.API_TOKEN_SALT = process.env.API_TOKEN_SALT || 'defaultApiTokenSalt';
process.env.TRANSFER_TOKEN_SALT = process.env.TRANSFER_TOKEN_SALT || 'defaultTransferTokenSalt';

let instance;

module.exports = async (req, res) => {
  try {
    if (!instance) {
      // Try different import strategies
      let strapi;
      try {
        // First try: CommonJS require with default
        const strapiModule = require('@strapi/strapi');
        strapi = strapiModule.default || strapiModule;
      } catch (requireError) {
        try {
          // Second try: Dynamic import
          const strapiModule = await import('@strapi/strapi');
          strapi = strapiModule.default;
        } catch (importError) {
          throw new Error(`Failed to load Strapi: ${requireError.message} | ${importError.message}`);
        }
      }

      if (typeof strapi !== 'function') {
        throw new Error(`Strapi is not a function, got: ${typeof strapi}`);
      }

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
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      details: error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};