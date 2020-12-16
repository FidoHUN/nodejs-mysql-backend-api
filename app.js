//installed: express,mysql,body-parser,express-device
import express from 'express';
import config from './config.js';
import { json, urlencoded } from 'body-parser';
import device from 'express-device';
import productRouter from './routers/product-router.js';
import { read_all_product_items } from './controllers/product-controller.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// SERVER CONFIGURATION
const app = express();
app.use(device.capture());
app.use(json());
app.use(urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname));

// SETTING CORS-POLICY (FOR DEVELOPMENT)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// PREFIXING ROUTES
const router = express.Router();
productRouter(router);
// app.use(router);
app.use(config.appVersion, router); // igy nem mukodott...

//COLD CALL
// app.get('/api/v1/nullproduct', read_all_product_items);

// START APPLICATION
app.listen(config.appPort, () => {
  console.log(
    `Product software is started running on port ${config.appPort}...`
  );
});

// DATABASE CONNECTION
import mysql from 'mysql';
export const conn = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
});
conn.connect(function (err) {
  if (err) {
    console.log('Database connection error! Error: ' + err);
  } else {
    console.log(
      `Connection to '${config.dbName}' database successful on port ${config.dbPort}!`
    );
  }
});

// conn.query('SELECT * FROM jofogas.termek', function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
