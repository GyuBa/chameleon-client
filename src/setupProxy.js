const {createProxyMiddleware} = require('http-proxy-middleware');
const useLocal = process.env.USE_LOCAL === 'true' || false;
console.log('setupProxy.js useLocal:', useLocal);

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: useLocal ? 'http://localhost:5000' : 'https://dev-platform.chameleon.best',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
    app.use(
        createProxyMiddleware('/uploads', {
            target: useLocal ? 'http://localhost:5000' : 'https://dev-platform.chameleon.best',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/websocket', {
            target: useLocal ? 'http://localhost:5000' : 'https://dev-platform.chameleon.best',
            changeOrigin: true,
            ws: true,
            secure: false
        })
    );
};