module.exports = {
  apps: [
    {
      name: 'strapi',
      script: 'npm',
      args: 'start',
      cwd: '/home/user/strapi-cms',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 1337
      }
    }
  ]
};