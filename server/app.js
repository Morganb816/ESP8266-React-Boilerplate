const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = 8080;
const db = require('./db/db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

dbStore.sync();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'dat boi was the hero we needed...',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

app.use('/auth', require('./routes/auth'));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public'));
});

const startServer = async () => {
    await db.sync();
    app.listen(port, console.log(`
    
    ----Listening on port ${port}---
    --- http://localhost:${port} ---
    
    `));
};

startServer();
