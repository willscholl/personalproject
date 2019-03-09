const bcrypt = require("bcryptjs");

const posts = [
  {
    id:0,
    title: 'Test Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    topic: 'test'
  }
]

module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let takenUsername = await db.check_username({ username });
    let takenEmail = await db.check_email({ email });
    takenUsername = +takenUsername[0].count;
    takenEmail = +takenEmail[0].count;
    console.log(takenEmail, takenUsername)
    if (takenUsername !== 0 || takenEmail !== 0) {
        return res.sendStatus(409);
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.register({ username, password: hash, email });
    user = user[0];
    session.user = user;
    console.log({ session });
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
    req.session.destroy(function(){;
    res.sendStatus(200)
    })
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
    const { title, content, topic } = req.body;
    const { session } = req;
    console.log(req.session)
    const { id } = req.session.user;
    const db = req.app.get("db");

    let post = await db.create_post([ id, title, content, topic ])
  },

  getTopics: async (req, res) => {
    const db = req.app.get("db");
    let topics = await db.get_topic()
    res.status(200).send(topics)
    // console.log(topics)
  }
};
