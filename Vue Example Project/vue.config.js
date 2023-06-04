// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = {
//   devServer: {
//     before: function(app) {
//       app.use(
//         '/feed',
//         createProxyMiddleware({
//           target: 'http://localhost:5173', // Reemplaza esto con la URL de la API de origen cruzado
//           changeOrigin: true,
//           secure: false,
//         })
//       );
//     },
//   },
// };