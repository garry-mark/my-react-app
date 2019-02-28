const path = require('path');

module.exports = {
  apps: [{
    name: 'APP',
    cwd: './',
    script: path.resolve(__dirname, './dist/server/main.js'),

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    instance_var: "INSTANCE_ID",
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
