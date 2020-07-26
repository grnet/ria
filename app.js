let express = require('express');
let session = require('express-session');
let path = require('path')
let cookieParser = require('cookie-parser');

let homeRoute = require('./routes/home')
let dashboardRoute = require('./routes/dashboard')

const app = express();

let memoryStore = new session.MemoryStore();

app.use(session({                                 
    secret:'thisShouldBeLongAndSecret',                         
    resave: false,                         
    saveUninitialized: true,                         
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


app.listen(3000, () => {
    console.log('Server Running on 3000!')
})