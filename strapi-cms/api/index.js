const strapi = require('@strapi/strapi');

let strapiInstance;

module.exports = async (req, res) => {
  if (!strapiInstance) {
    try {
      strapiInstance = await strapi({
        distDir: './dist',
        autoReload: false,
        serveAdminPanel: true,
      }).load();
      
      await strapiInstance.server.mount();
    } catch (error) {
      console.error('Strapi initialization error:', error);
      return res.status(500).json({ error: 'Failed to initialize Strapi' });
    }
  }
  
  return strapiInstance.server.app(req, res);
};