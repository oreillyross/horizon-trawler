const express = require('express');

const  { ApolloClient }  = require("apollo-boost");
const gql = require("graphql-tag");
require('cross-fetch/polyfill');

const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require('apollo-cache-inmemory');

const link = createHttpLink({ uri: "https://horizon-hasura.herokuapp.com/v1/graphql" });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

const GET_AUTOMATEDSEARCH_ON = gql`
  query getConfig {
  config_by_pk(id: "12345") {
    id
    automatedSearchOn
  }
}
`

client.query({
  query: GET_AUTOMATEDSEARCH_ON,
  
})
  .then(result => console.log(result));



const port = process.env.PORT || 8080;

const app = express();
app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});

app.listen(port, function () {
 console.log(`Example app listening on port !`);
});

