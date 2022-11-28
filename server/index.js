const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./database");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { v4: uuidv4 } = require("uuid");
uuidv4();
const bcrypt = require("bcryptjs");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = 3001;

//-------SIGNUP (create a new user and store it in the database with unique id and hashed password)---------
app.post("/signup", (req, res) => {
  console.log(req.body);
  if ("username" in req.body == false) {
    res.status(400);
    res.json({ status: "Missing username from body" });
    return;
  }
  if ("password" in req.body == false) {
    res.status(400);
    res.json({ status: "Missing password from body" });
    return;
  }
  if ("email" in req.body == false) {
    res.status(400);
    res.json({ status: "Missing email from body" });
    return;
  }
  //Create hash of the password with salt
  const salt = bcrypt.genSaltSync(6);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  const newUser = {
    id: uuidv4(),
    email: req.body.email,
    username: req.body.username,
    password: passwordHash,
  };
  console.log(newUser);
  connection.query(
    `INSERT INTO User(User_id, Email, Username, Password) VALUES ('${newUser.id}', '${newUser.email}', '${newUser.username}', '${newUser.password}')`,
    res
  );
  res.status(201).json({ status: "user created" });
});

/*********************************************
 * HTTP Basic Authentication
 * Passport module used
 * http://www.passportjs.org/packages/passport-http/
 ********************************************/

passport.use(
  new BasicStrategy(function (username, password, done) {
    console.log("username:" + username);
    console.log("password:" + password);
    // search matching username from our user table
    connection.query(
      `SELECT * FROM User WHERE Username="${username}"`,
      function (err, results, fields) {
        const userInfo = results;
        console.log(userInfo);
        // if match is found , comparte the passwords
        if (userInfo != null) {
          // if passwords match, then proceed to route handler (the proceed resource)
          if (bcrypt.compareSync(password, userInfo[0].Password) == true) {
            done(null, userInfo[0]);
          } else {
            // reject the request
            done(null, false);
          }
        } else {
          // reject the request
          done(null, false);
        }
      }
    );
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "mysecretkey",
};
passport.use(
  new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    console.log("JWT is valid");
    console.log("payload is as follows");
    console.log(jwt_payload);
    done(null, jwt_payload);
  })
);

app.post(
  "/jwtLogin",
  //check username and password
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.user.Email);

    // generate JWT token
    const payload = {
      user: {
        id: req.user.User_id,
        Email: req.user.Email,
        Username: req.user.Username,
      },
    };
    const secretKey = "mysecretkey";
    const options = {
      expiresIn: "1d",
    };
    const generatedJWT = jwt.sign(payload, secretKey, options);
    //store JWT at localStorage

    // send JWT as a response

    res.json({ jwt: generatedJWT });
  }
);

//get user-pecific view
app.get(
  "/user_specific",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    console.log(req.user);
    res.send("Hello protected world");
  }
);
// read data from database v1 v2
app.get("/", async function (req, res) {
  let sql = "SELECT * FROM v1_v2";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V3 monthly data
app.get("/v3_monthly", async function (req, res) {
  let sql = "SELECT * FROM v3_monthly";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V3 annual data
app.get("/v3_annual", async function (req, res) {
  let sql = "SELECT * FROM v3_annual";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V4 and V10
app.get("/v4_v10", async function (req, res) {
  let sql = "SELECT * FROM v4_v10";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V9 Sectors
app.get("/v9_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// V9 Sub-Sectors
app.get("/v9_sub_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sub_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// read data from database v5
app.get("/v5", async function (req, res) {
  let sql = "SELECT * FROM v5";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v6
app.get("/v6", async function (req, res) {
  let sql = "SELECT * FROM v6";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v7
app.get("/v7", async function (req, res) {
  let sql = "SELECT * FROM v7";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});
//read data from database v8
app.get("/v8", async function (req, res) {
  let sql = "SELECT * FROM v8 ";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

//read data from database v8
app.get("/description", async function (req, res) {
  let sql = "SELECT * FROM description ";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

//listen method
app.listen(port, function (err) {
  console.log("listening...." + port);
});

/** */
