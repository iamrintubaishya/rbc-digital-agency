const strapi = require('@strapi/strapi');

let instance;

module.exports = async (req, res) => {
  try {
    if (!instance) {
      // Set NODE_ENV to production for Vercel
      process.env.NODE_ENV = 'production';
      
      // Initialize Strapi with the dist directory
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
      message: error.message 
    });
  }
};