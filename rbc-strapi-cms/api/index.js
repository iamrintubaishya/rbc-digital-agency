const { default: strapi } = require('@strapi/strapi');

let instance;

module.exports = async (req, res) => {
  try {
    if (!instance) {
      // Set NODE_ENV to production for Vercel
      process.env.NODE_ENV = 'production';
      
      // Initialize Strapi with the dist directory
      instance = await strapi({ 
        distDir: './dist',
        appDir: process.cwd()
      }).load();
    }
    
    return instance.server.app(req, res);
  } catch (error) {
    console.error('Strapi initialization error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};