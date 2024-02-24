const axios = require('axios')
const cheerio = require('cheerio')
 
const markkoub(id1, id2, id3, id4) {
 return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, '0')}`;

      if (!id4 || (!id3 && !id4)) {
        id4 = formattedDate;
        id3 = 1;
      }

      const url = `https://www.markoub.ma/fr/Recherche/Show?villeDepartId=${id1}&villeArriveeId=${id2}&nbrSeat=${id3}&dateDepart=${formattedDate}-${id4}`;
      
      const { data } = await axios.get(url);
      
      const $ = cheerio.load(data);
      const scriptText = $("script").eq(-2).text();

      // Rest of logic to extract data
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

    const result = `[${final}]`;
      resolve(result);
      
    } catch (error) {
      reject(error);
    }

  });

}
module.exports = markoub
