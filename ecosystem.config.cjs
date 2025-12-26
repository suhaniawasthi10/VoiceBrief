module.exports = {
    apps: [
        {
            name: 'voicebrief-api',
            script: './backend/src/server.js',
            cwd: '/home/ubuntu/var/www/html/VoiceBrief',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M'
        }
    ]
};
