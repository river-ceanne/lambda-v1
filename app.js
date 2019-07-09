'use strict';

process.env.Q_SERVER = 'https://q-js401.herokuapp.com';

const express = require('express');
const QueueClient = require('@nmq/q/client');
const runners = require('@johnfellows/unsafe-code-runner');

// Event Handler
const database = new QueueClient('database');
database.subscribe('create', recordGotCreated);

function recordGotCreated(payload) {
  const message = 'HEY! ... it looks like a record got created...';
  console.log(message);
  console.log(payload);
}

// Express Server!
const app = express();

app.get('/run/my/function', handleRoute);

function handleRoute(req,res) {
  const message = 'Something AMAZING just happened in a route ...';
  console.log(message);
  res.status(200).send(message);
}



app.listen(3000, () => console.log('server up'));
