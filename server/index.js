require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      massive = require("massive"),
      ctrl = require("./controller");

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const app = express(),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(express.json());
app.use(
  session({
    store: new pgSession({
      pool: pgPool
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000000
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is dbing");
  app.listen(SERVER_PORT, () => console.log(`bang on port ${SERVER_PORT}`));
});

//AUTH
app.post("/auth/register", ctrl.register);
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)
app.get('/auth/isLoggedIn', ctrl.isLoggedIn)

//FORUMS
app.post('/api/post', ctrl.create);
app.get('/api/topics', ctrl.getTopics)
