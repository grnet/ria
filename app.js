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

const app = express(); //app init

let memoryStore = new session.MemoryStore(); //We will store our user session details to the memory 

app.use(session({                                 
    secret:'thisShouldBeLongAndSecret', //The secret is used to hash the session with HMAC                                          
    store: memoryStore
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/dashboard', dashboardRoute);
app.use('/create', createRoute);
app.use('/form_a', form_aRoute)


app.listen(3000, () => {
    database.sequelize.sync();
    console.log('Server Running on 3000!')
})