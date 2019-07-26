const cheerio = require("cheerio");
const fetch = require("node-fetch");

const href = "https://en.annahar.com/section/184-lebanon";

const getMainSources = async url => {
  let sources = [];
  try {
    const response = await fetch(url);
    const html = await response.text();
    let $ = cheerio.load(html);
    $("article a").each(function(i, elem) {
      let href = `https://en.annahar.com${$(this).attr("href")}`;
      sources.push(href);
    });
  } catch (err) {
    console.log(err);
  } finally {
    return sources;
  }
};

const getArticleData = async article => {
  try {
    const response = await fetch(article);
    const html = await response.text();
    let $ = cheerio.load(html);
    const text = $(".author_intro div h4").text();
    const description = $(".description").text();
    return {
      title: $("h1").text(),
      description: description,
      source: "Annahar",
      href: article,
      crawlDate: new Date()
    };
  } catch (err) {
    console.error(err);
  }
};

const getSources = url => {
  return getMainSources(url).then(sources => {
    const promises = sources.map(getArticleData);
    return Promise.all(promises).then(data => {
      return data;
    });
  });
};

// comment out this mocking call and uncomment the line belowit
module.exports = new Promise((resolve, reject) => {
  resolve([
    {
      title: "Lebanon's Cabinet endorses austerity budget",
      description:
        "Lebanon's debt to GDP ratio, which ballooned to 11.5 percent in 2018, has been slashed to 7.5 percent, Information Minister Jamal Jarrah said. ",
      source: "Annahar",
      href:
        "https://en.annahar.com/article/977165-lebanons-cabinet-set-to-endorse-austerity-budget",
      crawlDate: "2019-07-26T12:04:20.919Z"
    },
    {
      title: "Protesters attempt to storm Lebanon's government headquarters",
      description:
        "The government’s planned budget cuts have unleashed a wave of public discontent, amid leaks that austerity could target public wages, services and social benefits.",
      source: "Annahar",
      href:
        "https://en.annahar.com/article/974423-protesters-attempt-to-storm-lebanons-government-headquarters",
      crawlDate: "2019-07-26T12:04:21.328Z"
    }
  ]);
});
//module.exports = getSources(href)

// const importData = require('../importData')

//  getSources(href).then(data => {
//   console.log(data)
//  })
