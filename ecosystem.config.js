module.exports = {
  apps: [
    {
      name: 'slik-api',
      script: 'dist/src/main.js', // Path to your compiled JavaScript entry file
      instances: 'max', // Number of instances to run
      exec_mode: 'cluster', // Cluster mode for load balancing
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
