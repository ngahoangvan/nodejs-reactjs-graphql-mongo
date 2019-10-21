const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const grapQLSchema = require('./graphql/schema/index');
const grapQLResolver = require('./graphql/resolves/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: grapQLSchema,
    rootValue: grapQLResolver,
    graphiql: true
  })
);

mongoose.connect(`mongodb://mongodb/mydb`, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
