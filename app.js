const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/mainRouter');
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'rahasia-perusahaan-sangat-aman',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
  } 
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(router);

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})