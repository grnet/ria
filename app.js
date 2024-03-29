//dependencies
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const path = require("path");
const cookieParser = require("cookie-parser");

//declare routes
const homeRoute = require("./routes/home");
const loginRoute = require("./routes/login");
const oauth2 = require("./routes/oauth2");
const logoutRoute = require("./routes/logout");
const createRoute = require("./routes/create");
const editRoute = require("./routes/edit");
const database = require("./services/database");
const createUserRoute = require("./routes/create_user");
const searchUserRoute = require("./routes/search_user");
const editUserRoute = require("./routes/edit_user");
const dashboardRoute = require("./routes/dashboard");
const historyRoute = require("./routes/history");
const summariesRoute = require("./routes/summaries");
const profileRoute = require("./routes/profile");
const ministriesRoute = require("./routes/ministries");
const indexesRoute = require("./routes/indexes");

const app = express(); //app init
app.use(cookieParser());

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: "ria_redis",
    port: 6379,
  },
});
redisClient.connect();
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    secret: process.env.SECRET, //The secret is used to hash the session with HMAC. Value retrieved from docker-compose.
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 720 * 10, // session max age in miliseconds -- session age is 2 hours
    },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json({ limit: "600mb" }));
app.use(
  express.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 35000 })
); //change limit if parser has too many parameters
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.disable("x-powered-by");

app.use("/", homeRoute);
app.use("/login", loginRoute);
// app.use(process.env.OAUTH2_LOGIN_PATH, oauth2); //Path have to be changed to /palogin or something, after KED is done
app.use("/oauth2", oauth2); //this may not needed if the OAUTH2_LOGIN_PATH already starts with /oauth2
app.use("/logout", logoutRoute);
app.use("/create_analysis", createRoute);
app.use("/edit_analysis", editRoute); //TODO: rename route to edit_analysis
app.use("/user_views/dashboard", dashboardRoute);
app.use("/user_views/create_user", createUserRoute);
app.use("/user_views/search_user", searchUserRoute);
app.use("/user_views/edit_user", editUserRoute);
app.use("/user_views/history", historyRoute);
app.use("/user_views/summaries", summariesRoute);
app.use("/user_views/profile", profileRoute);
app.use("/user_views/ministries", ministriesRoute);
app.use("/user_views/indexes", indexesRoute);

app.listen(3000, () => {
  database.sequelize.sync();
  console.log("Server Running on 3000!");
});
