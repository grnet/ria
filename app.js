//dependencies
let express = require('express');
let session = require('express-session');
let path = require('path')
let cookieParser = require('cookie-parser');

//app routes/endpoints
let homeRoute = require('./routes/home')
let dashboardRoute = require('./routes/dashboard')
let createRoute = require('./routes/create')
let form_aRoute = require('./routes/form_a')
let database = require('./services/database')
let usersRoute = require('./routes/users')
let createUserRoute = require('./routes/create_user')
let searchUserRoute = require('./routes/search_user')
let adminDashboardRoute = require('./routes/admin_dashboard')

const app = express(); //app init

let memoryStore = new session.MemoryStore(); //We will store our user session details to the memory 

app.use(session({                                 
    secret:'thisShouldBeLongAndSecret', //The secret is used to hash the session with HMAC                                          
    store: memoryStore
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false, parameterLimit: 1500 }));//change limit if too many parameters to be parsed
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname,'public/js')));
//app.use('js',express.static(path.join(__dirname,'/js/')));

app.use('/', homeRoute);
app.use('/dashboard', dashboardRoute);
app.use('/create', createRoute);
app.use('/users', usersRoute);//yay this works!
app.use('/form_a', form_aRoute);
app.use('/user_views/admin_dashboard', adminDashboardRoute);
app.use('/user_views/create_user', createUserRoute);
app.use('/user_views/search_user', searchUserRoute);



app.listen(3000, () => {
    database.sequelize.sync();
    console.log('Server Running on 3000!')
})