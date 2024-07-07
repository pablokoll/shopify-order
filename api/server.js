const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use(
    '/webmefy/data',
    createProxyMiddleware({
        target: 'https://technical-test.webmefy.io',
        changeOrigin: true,
        pathRewrite: (path, req) => path.replace('/', '/webmefy/data'),
    }),
);

app.listen(3001, () => {
    console.log('Proxy server is running on http://localhost:3001');
});
