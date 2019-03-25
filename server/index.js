require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      massive = require("massive"),
      ctrl = require("./controller")

const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const aws = require('aws-sdk')

const app = express(),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET_2, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

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

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET_2,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET_2}.s3.amazonaws.com/${fileName}`,
    };
    console.log(returnData)

    return res.send(returnData);
  });
});

//AUTH
app.post("/auth/register", ctrl.register);
app.post('/auth/login', ctrl.login);
app.post('/auth/logout', ctrl.logout);
app.get('/auth/isLoggedIn', ctrl.isLoggedIn);
app.put('/auth/updateUser', ctrl.updateUser);

//FORUMS
app.get('/api/topics', ctrl.getTopics);
app.get('/api/topic/:topic', ctrl.getDiscussions);
app.get('/api/forum/:id', ctrl.getPost);

//Posts
app.post('/api/post', ctrl.create);
app.put('/api/post', ctrl.updatedPost);
app.delete('/api/post/:id', ctrl.deletePost)

// Replies
app.post('/api/reply', ctrl.createReply);
app.put('/api/reply', ctrl.updatedReply);
app.delete('/api/reply/:reply_id', ctrl.deleteReply);

//Dash
app.get('/api/top5', ctrl.getTop5)

