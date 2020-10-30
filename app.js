//dependencies
let express = require('express');
let session = require('express-session');
let path = require('path')
let cookieParser = require('cookie-parser');

//app routes/endpoints
let homeRoute = require('./routes/home')
let loginRoute = require('./routes/login')
let createRoute = require('./routes/create')
let form_aRoute = require('./routes/form_a')
let database = require('./services/database')
let createUserRoute = require('./routes/create_user')
let searchUserRoute = require('./routes/search_user')
let editUserRoute = require('./routes/edit_user')
let adminDashboardRoute = require('./routes/admin_dashboard')
let userDashboardRoute = require('./routes/user_dashboard')
let historyRoute = require('./routes/history')
let summariesRoute = require('./routes/summaries')
let profileRoute = require('./routes/profile')


const app = express(); //app init
app.use(cookieParser());

// prune expired entries every 24h to avoid memory leaks
let memoryStore = new session.MemoryStore({checkPeriod: 86400000 }); //We will store our user session details to the memory 
 app.use(session({                                 
    secret:'thisShouldBeLongAndSecret', //The secret is used to hash the session with HMAC                                         
    store: memoryStore,
    
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 1500 }));//change limit if too many parameters to be parsed
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname,'public/js')));
//app.use('js',express.static(path.join(__dirname,'/js/')));

app.use('/', homeRoute);
app.use('/login', loginRoute);;
app.use('/create', createRoute);
app.use('/form_a', form_aRoute);
app.use('/user_views/admin_dashboard', adminDashboardRoute);
app.use('/user_views/user_dashboard', userDashboardRoute);
app.use('/user_views/create_user', createUserRoute);
app.use('/user_views/search_user', searchUserRoute);
app.use('/user_views/edit_user', editUserRoute);
app.use('/user_views/history', historyRoute)
app.use('/user_views/summaries', summariesRoute)
app.use('/user_views/profile', profileRoute)

app.listen(3000, () => {
    database.sequelize.sync();
    console.log('Server Running on 3000!')
})