const bcrypt = require("bcryptjs");

const posts = [
  {
    id: 0,
    title: "Test Post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    topic: "test"
  }
];

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}



module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let takenUsername = await db.check_username({ username });
    let takenEmail = await db.check_email({ email });
    takenUsername = +takenUsername[0].count;
    takenEmail = +takenEmail[0].count;
    // console.log(takenEmail, takenUsername);
    if (takenUsername !== 0 || takenEmail !== 0) {
      return res.sendStatus(409);
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.register({ username, password: hash, email });
    user = user[0];
    session.user = user;
    // console.log({ session });
    res.status(200).send(session.user);
  },

  login: async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let user = await db.login_username({ username: usernameOrEmail });

    user = user[0];
    if (!user) {
      let user = await db.login_email({ email: usernameOrEmail });
      user = user[0];
      if (!user) {
        return res.sendStatus(401);
      } else {
        checkPasswordAndSetSession(password, user);
      }
    } else {
      checkPasswordAndSetSession(password, user);
    }

    function checkPasswordAndSetSession(password, user) {
      let authenticated = bcrypt.compareSync(password, user.password);
      if (authenticated) {
        delete user.password;
        session.user = user;
        res.status(200).send(session.user);
      } else {
        res.sendStatus(401);
      }
    }
  },

  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },

  isLoggedIn: (req, res) => {
    const { user } = req.session;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  },

  create: async (req, res) => {
    const { title, content, topic_id, photo} = req.body;
    const { session } = req;
    const { id } = req.session.user;
    const db = req.app.get("db");
    let date = formatDate(new Date())
    let post = await db.create_post([id, title, content, topic_id, date, photo]);
    res.sendStatus(200)
  },

  updatedPost: async (req,res) => {
    console.log(req.body)
    const { content, post_id } = req.body
    // console.log(content , post_id)
    const db = req.app.get("db");
    await db.update_post([content, post_id])
    res.sendStatus(200)
  },

  createReply: async (req,res) => {
    console.log(req.body)
    const { reply } = req.body
    const { post_id } = req.body
    // console.log(111, reply, post_id)
    const { id: user_id } = req.session.user
    // console.log(user_id)
    const db = req.app.get("db");
    let date = formatDate(new Date())
    await db.create_reply([user_id, reply, post_id, date])
    res.sendStatus(200)
  },

  updatedReply: async (req,res) => {
    console.log(req.body)
    const { reply, reply_id } = req.body
    console.log(reply, reply_id)
    const db = req.app.get("db");
    await db.update_reply([reply, reply_id])
    res.sendStatus(200)
  },

  deleteReply: async (req,res) => {
    const { reply_id } = req.params
    const db = req.app.get("db");
    await db.delete_reply([reply_id])
    res.sendStatus(200)
  },

  deletePost: async (req,res) => {
    const { id } = req.params
    const db = req.app.get("db");
    await db.delete_post([id])
    res.sendStatus(200)
  },

  getTopics: async (req, res) => {
    const db = req.app.get("db");
    let topics = await db.get_topics();
    res.status(200).send(topics);
    // console.log(topics)
  },
  
  getDiscussions: async (req, res) => {
    const db = req.app.get("db");
    const { topic } = req.params;
    // console.log(topic);
    let gettopic = await db.get_discussions([topic]);
    res.status(200).send(gettopic);
  },

  getPost: async (req, res) => {
    const db = req.app.get("db");
    req.params.id = parseInt(req.params.id)
    let { id } = req.params;
    // console.log(req.params);
    let getpost = await db.get_post([id]);
    getpost[0] = getpost[0].row_to_json
    // console.log(getpost[0]);
    res.status(200).send(getpost[0]);
  }
};
