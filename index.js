const express = require("express");
const annahar = require("./sources/annahar");
const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-boost");
const gql = require("graphql-tag");
const spaceToUnderScore = require("./utils/space-to-underscore");
const onlyAtoZ = require("./utils/only-a-z");
require("cross-fetch/polyfill");
const fs = require("fs");
const path = require("path");

const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");

const link = createHttpLink({
  uri: "https://horizon-hasura.herokuapp.com/v1/graphql"
});
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
`;
async function checkAutomatedSearch() {
  const result = await client.query({
    query: GET_AUTOMATEDSEARCH_ON,
    fetchPolicy: "network-only"
  });
  return result.data.config_by_pk.automatedSearchOn;
}

async function getArticleText(url) {
  const response = await fetch(url);
  const html = await response.text();
  return html;
  //return "some text";
}

async function processSources() {
  const keywords = ["beirut", "roadblocks", "retired army officers"];
  const articles = await annahar;
  return Promise.all(
    articles.map(article => {
      getArticleText(article.href).then(text => {
        const fileName = onlyAtoZ(spaceToUnderScore(article.title));
        fs.writeFileSync(path.join("articles", fileName), text);
      });
    })
  );
  // get articles by source
  // map through keywords attached to source if it appears save article and save metadate in hasura DB
}
//
processSources();

function automate() {
  checkAutomatedSearch().then(automatedSearchOn => {
    if (automatedSearchOn) {
      console.log("performing a search at", new Date());
    } else {
      console.log("Automated Search is off");
    }
  });
}

//setInterval(automate,5000)

const port = process.env.PORT || 8080;

const app = express();
app.get("/", function(req, res) {
  checkAutomatedSearch().then(v => {
    res.send(JSON.stringify(v));
  });
});

app.listen(port, function() {
  console.log(`Example app listening on port !`);
});
