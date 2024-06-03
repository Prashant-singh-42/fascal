const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
// const path = require('path');

const authRoutes = require('./routes/authroute')
const wishlistRoutes = require('./routes/wishlistroutes')
// const productRoutes = require('./routes/productRoutes')
// const cartRoutes = require('./routes/cartRoutes')
// const userRoutes = require('./routes/userRoutes')
// const orderRoutes = require('./routes/OrderRoutes')

const { requireAuth } = require('./middlewares/auth');
const { errorHandlerMiddleware } = require('./middlewares/errohandler');

const app = express();

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};
// middleware
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,   // Only send the cookie over HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
  },
}));

// view engine
// app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Prashant:gqJ331olVyRwaudR@cluster0.1c8kx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/authDB';
mongoose.connect(dbURI)
  .then((result) => {
      app.listen(3000, () => console.log("listening on " + 3000))
    })
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// app.use('/upload', express.static(path.join(__dirname, 'upload')));
// app.get('/sample', (req, res) => res.status(200).send("okay"));
app.use('/auth',authRoutes)
app.use('/wishlist',requireAuth ,wishlistRoutes)
// app.use('/product', requireAuth, errorHandlerMiddleware, productRoutes)
// app.use('/cart', requireAuth, errorHandlerMiddleware, cartRoutes)
// app.use('/user', requireAuth, errorHandlerMiddleware, userRoutes)
// app.use('/order', requireAuth, errorHandlerMiddleware, orderRoutes)