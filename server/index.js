const express = require("express");
const cors = require("cors");
const connection = require("./database");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
app.use(
  cors({
    origin: "https://defautl-dot-charttest-367617.lm.r.appspot.com",
  })
);

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV === "production") {
  connection.socketPath = process.env.GAE_DB_ADDRESS;
} else {
  connection.host = "localhost";
}

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-------SIGNUP (create a new user and store it in the database with unique id and hashed password)---------
app.post("/signup", (req, res) => {
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

  connection.query(
    `INSERT INTO User(user_id, email, username, password) VALUES ('${newUser.id}', '${newUser.email}', '${newUser.username}', '${newUser.password}')`,
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
    // search matching username from our user table
    connection.query(
      `SELECT * FROM User WHERE username="${username}"`,
      function (err, results, fields) {
        const userInfo = results;

        // if match is found , comparte the passwords
        if (userInfo[0] != null) {
          // if passwords match, then proceed to route handler (the proceed resource)
          if (bcrypt.compareSync(password, userInfo[0].password) == true) {
            done(null, userInfo[0]);
          } else {
            // reject the request
            done(null, false);

            return;
          }
        } else {
          // reject the request
          done(null, false);

          return;
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
    done(null, jwt_payload);
  })
);

app.post(
  "/jwtLogin",
  //check username and password
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    // generate JWT token
    const payload = {
      user: {
        id: req.user.user_id,
        Email: req.user.email,
        Username: req.user.username,
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
    res.send("Hello protected world");
  }
);
app.post("/create", (req, res) => {
  const newSpecification = {
    customiseid: uuidv4(),
    userid: req.body.userid,
    V1: req.body.V1,
    description01: req.body.description01,
    V2: req.body.V2,
    description02: req.body.description02,
    V3: req.body.V3,
    description03: req.body.description03,
    V4: req.body.V4,
    description04: req.body.description04,
    V5: req.body.V5,
    description05: req.body.description05,
    V6: req.body.V6,
    description06: req.body.description06,
    V7: req.body.V7,
    description07: req.body.description07,
    V8: req.body.V8,
    description08: req.body.description08,
    V9: req.body.V9,
    description09: req.body.description09,
    columns: req.body.columns,
  };

  connection.query(
    `INSERT INTO customise (customiseid,userid,view1,description01,view2,description02,view3,description03,view4,description04,view5,description05,view6,description06,view7,description07,view8,description08,view9,description09,columns) VALUES ('${newSpecification.customiseid}','${newSpecification.userid}', '${newSpecification.V1}', '${newSpecification.description01}','${newSpecification.V2}', '${newSpecification.description02}', '${newSpecification.V3}','${newSpecification.description03}','${newSpecification.V4}', '${newSpecification.description04}', '${newSpecification.V5}','${newSpecification.description05}','${newSpecification.V6}', '${newSpecification.description06}', '${newSpecification.V7}','${newSpecification.description07}','${newSpecification.V8}', '${newSpecification.description08}','${newSpecification.V9}', '${newSpecification.description09}', '${newSpecification.columns}')`,
    res
  );
  res.status(201).json({ status: "userview created" });
});
// delete user
app.post("/delete", async function (req, res) {
  const deleteUser = req.body.userid;
  let sql = `DELETE FROM customise WHERE userid='${deleteUser}'`;
  connection.query(sql, function (err, result) {
    connection.query(`DELETE FROM User WHERE user_id='${deleteUser}'`);
    if (err) throw err;
    res.send(result);
  });
});
//delete view
app.post("/deleteview", async function (req, res) {
  const deleteView = req.body.viewid;
  let sql = `DELETE FROM customise WHERE customiseid='${deleteView}'`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
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
  let sql = "SELECT * FROM v7_v10";
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
app.get("/list", async function (req, res) {
  let sql = `SELECT * FROM customise `;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

//------------------------------------------------------------------------------------------------------
//listen method
app.listen(port, function (err) {
  console.log("listening...." + port);
});
