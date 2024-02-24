const axios = require('axios')
async function markoub(id1, id2, id3, id4) {
  try {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const url = `https://www.markoub.ma/fr/Recherche/Show?villeDepartId=${id1}&villeArriveeId=${id2}&nbrSeat=${id3}&dateDepart=${formattedDate}-${id4}`;
    console.log(url);
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptText = $("script").eq(-2).text();

    const regex = /prices:\s*_.map\(\[\s*.*?\],function\(f\){/;
    const match = scriptText.match(regex);
    if (!match || !match[0]) {
      let errorr = "404";
      return errorr;
    }

    const final = match[0]
      .replace("prices: _.map([", "")
      .replace("],function(f){", "")
      .replace("false},", "false}")
      .replace('false}{"voyageId', 'false},{"voyageId')
      .replace('true}{"voyageId', 'true},{"voyageId');

    const jsonData = `[${final}]`;
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
module.exports = markoub
