// app.js включает основную логику сервера, запуск и подключение к базе данных

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const ErrorStatusNotFound = require('./utilits/errorStatusNotFound');
const handleError = require('./middlewares/handleError');
const { userValidation } = require('./middlewares/userValidation');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
// console.log(process.env.NODE_ENV);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Подключилось к БД'))
  .catch((err) => console.log(`Ошибка: ${err.message}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', userValidation, login);
app.post('/signup', userValidation, createUser);
app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use('*', (req, res, next) => {
  next(new ErrorStatusNotFound('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Порт: ${PORT}`);
});
