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
const elasticlunr = require("elasticlunr");

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

const index = elasticlunr(function() {
  this.addField("title");
  this.addField("body");
  this.setRef("id");
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
  //const response = await fetch(url);
  //const html = await response.text();
  //return html;
  return `Lebanon's Cabinet endorsed Monday the final draft budget to be submitted to Parliament for ratification, as pressure mounts on the small Mediterranean country to get its finances in order.

The budget, one of the "most austere in the history of Lebanon" as Prime Minister Saad Hariri recently said, features a number of measures to raise revenues and decrease spending.

Lebanon's budget deficit, which ballooned to 11.5 percent in 2018, will be reduced to 7.5 percent, Information Minister Jamal Jarrah said. 

To bolster the state's coffers, the Cabinet endorsed the second tax hike in two years on the interest earned on deposits and government-issued treasury bills and bonds, much to the ire of the banking sector. `;
}
const keywords = "tax";

async function processSources() {
  const articles = await annahar;
  return Promise.all(
    articles.map((article, idx) => {
      getArticleText(article.href).then(text => {
        const fileName = onlyAtoZ(spaceToUnderScore(article.title));
        index.addDoc({ id: ++idx, title: article.title, body: text });
        fs.writeFileSync(path.join("articles", fileName + ".html"), text);
      });
    })
  );
}

processSources().then(() => {
  console.log("do search");
  console.log(index.search(keywords));
  console.log(index.toJSON());
});

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
