const {createProxyMiddleware} = require('http-proxy-middleware');
const backendPaths = ['/api'];

module.exports = function (app) {
    backendPaths.forEach(path => {
        app.use(
            createProxyMiddleware(path, {
                target: 'https://dev-platform.chameleon.best',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            })
        )
    });
    app.use(
        createProxyMiddleware('/websocket', {
            target: 'https://dev-platform.chameleon.best',
            changeOrigin: true,
            ws: true,
            secure: false
        })
    );
};