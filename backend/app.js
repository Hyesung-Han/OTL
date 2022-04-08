const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const itemsRouter = require('./src/items/items.controller');
const salesRouter = require('./src/sales/sales.controller');
const userRouter = require('./src/user/user.controller');
const homeRouter = require('./src/home/home.controller');

const { swaggerUi, specs } = require("./swagger");
const app = express();
const router = express.Router();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

router.use('/items', itemsRouter);
router.use('/sales', salesRouter);
router.use('/user', userRouter);
router.use('/home', homeRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", router);
app.use(helmet()); // swagger ui path 보다 아래로 놓아야 서버에서 스웨거 보기 가능
// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404);
  res.send(createError(404));
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
