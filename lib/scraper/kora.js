const cheerio = require("cheerio")
const fetch = require('node-fetch')
const moment = require('moment')

function kora(day) {
  return new Promise((resolve, reject) => {
    const url = `https://jdwel.com/${day}`;
    fetch(url)
      .then(response => {
        return response.text();
      })
      .then(html => {
        const $ = cheerio.load(html);
        const matches = [];

        $('ul.comp_matches_list.matches_list').each((_, element) => {
          const leagueName = $(element).find('.comp_separator.container .main h4').text().trim();
          const leagueMatches = [];
          $(element).find('.single_match').each((_, match) => {
            const teams = [
              $(match).find('.team.hometeam span.the_team').text().trim(),
              $(match).find('.team.awayteam span.the_team').text().trim()
            ];
           const dateTime = $(match).find('.middle_column.cell.col-2 .match_time .the_otime').text();
          const time = moment(dateTime).subtract(2, 'hours').format('HH:mm');
            const status = $(match).find('.match_status span').text().trim();
            const score = [
              $(match).find('.match_score .hometeam').text(),
              $(match).find('.match_score .awayteam').text()
            ];
            leagueMatches.push({
              teams,
              status,
              time,
              score
            });
          });

          matches.push({
            league: leagueName,
            matches: leagueMatches
          });
        });

        const json = JSON.stringify(matches);
        resolve(json);
        console.log(json)
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        reject(error);
      });
  });
}

module.exports = kora 
