const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session);

const knex = require('../dbConfig')

const sessionConfig = {
  name:'session-cookie',
  secret: 'super mcrib',
  resave: false,
  saveUninitialized: true, // related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // should be true in production
    httpOnly: true // true means JS can't touch the cookie
  },
  store:new KnexStore({
    knex,
    tablename:'sessions',
    createtable:true,
    sidfieldname:'sid',
    clearInterval: 1000 * 60 * 10,
    
  })
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig))
};
