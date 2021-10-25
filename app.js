//dependencies
let express = require('express');
let session = require('express-session');
let path = require('path')
let cookieParser = require('cookie-parser');

//app routes/endpoints
let homeRoute = require('./routes/home')
let loginRoute = require('./routes/login')
let logoutRoute = require('./routes/logout')
let createRoute = require('./routes/create')
let form_aRoute = require('./routes/form_a')
let database = require('./services/database')
let createUserRoute = require('./routes/create_user')
let searchUserRoute = require('./routes/search_user')
let editUserRoute = require('./routes/edit_user')
let adminDashboardRoute = require('./routes/admin_dashboard')
let dashboardRoute = require('./routes/dashboard')
let historyRoute = require('./routes/history')
let summariesRoute = require('./routes/summaries')
let profileRoute = require('./routes/profile')
let ministriesRoute = require('./routes/ministries')

const app = express(); //app init
app.use(cookieParser());
// prune expired entries every 24h to avoid memory leaks
let memoryStore = new session.MemoryStore({checkPeriod: 86400000 }); //We will store our user session details to the memory 
 app.use(session({                                 
    secret: process.env.SECRET, //The secret is used to hash the session with HMAC. Value retrieved from docker-compose.                                         
    store: memoryStore,
    
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 3000 }));//change limit if parser has too many parameters
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/create', createRoute);
app.use('/form_a', form_aRoute);
app.use('/user_views/admin_dashboard', adminDashboardRoute);
app.use('/user_views/dashboard', dashboardRoute);
app.use('/user_views/create_user', createUserRoute);
app.use('/user_views/search_user', searchUserRoute);
app.use('/user_views/edit_user', editUserRoute);
app.use('/user_views/history', historyRoute)
app.use('/user_views/summaries', summariesRoute)
app.use('/user_views/profile', profileRoute)
app.use('/ministries', ministriesRoute);

app.listen(3000, () => {
    database.sequelize.sync();
    console.log('Server Running on 3000!')
})