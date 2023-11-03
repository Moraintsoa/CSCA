const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", "./");

app.use(express.static("./static"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: false,
}));

const authRoutes = require('./routes/Routes');

app.use('/', authRoutes);

app.listen(port, () => {
  console.log('Server app listening on port ' + port);
});


