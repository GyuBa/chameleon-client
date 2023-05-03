const {createProxyMiddleware} = require('http-proxy-middleware');
const backendPaths = ['/api'];
const useLocal = process.env.USE_LOCAL === 'true' || false;
console.log('setupProxy.js useLocal:', useLocal);

module.exports = function (app) {
    backendPaths.forEach(path => {
        app.use(
            createProxyMiddleware(path, {
                target: useLocal ? 'http://localhost:5000' : 'https://dev-platform.chameleon.best',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            })
        )
    });
    app.use(
        createProxyMiddleware('/websocket', {
            target: useLocal ? 'http://localhost:5000' : 'https://dev-platform.chameleon.best',
            changeOrigin: true,
            ws: true,
            secure: false
        })
    );
};