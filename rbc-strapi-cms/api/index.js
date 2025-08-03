const strapi = require('@strapi/strapi');
const app = strapi({ distDir: './dist' });

module.exports = async (req, res) => {
  if (!global.strapi) {
    global.strapi = await app.load();
  }
  
  await global.strapi.server.mount();
  return global.strapi.server.app(req, res);
};