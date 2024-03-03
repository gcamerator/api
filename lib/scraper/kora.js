import fetch from 'node-fetch';
import cheerio from 'cheerio';
import moment from 'moment';

const leagueEmojis = [
  { league: 'الدوري الفرنسي', emoji: '🇫🇷' },
  { league: 'الدوري الإنجليزي الممتاز', emoji: '🏴' }
];

const excludedLeagues = [
  'الدوري الليبيري الممتاز',
  'الدوري الصيني سوبر',
  'دوري الرديف السعودي',
  'بطولة باوليستا البرازيل',
  'الدوري القطري نجوم قطر',
  'الدوري الأردني للمحترفين',
];

const getLeagueEmoji = (leagueName) => {
  const match = leagueEmojis.find((item) => item.league === leagueName);
  return match ? match.emoji : '‏';
};

const getLiveMatches = async (command) => {
  let kurl, txtx;
  if (command === 'kora') {
    kurl = 'https://jdwel.com/today/';
    txtx = '*مباريات اليوم* :\n‏▬▬▬▬▬▬';
  } else if (command === 'korat') {
    kurl = 'https://jdwel.com/tomorrow/';
    txtx = '*مباريات الغد* :\n‏▬▬▬▬▬▬';
  } else if (command === 'koray') {
    kurl = 'https://jdwel.com/yesterday/';
    txtx = '*مباريات الأمس* :\n‏▬▬▬▬▬▬';
  } else if (command === 'koran') {
    kurl = 'https://jdwel.com/today/';
    txtx = '*مباريات الأن* :\n‏▬▬▬▬▬\n';
  } else {
    return null;
  }
  const url = kurl;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const matchesInfo = [];
    let currentLeague = '';

    matchesInfo.push(`${txtx}`);
    $('ul.comp_matches_list.matches_list').each((index, element) => {
      const leagueName = $(element).find('.comp_separator.container .main h4').text().trim().replace(/ الدرجة الاولى/g, '').replace(/ الدرجة الأولى/g, '');
      const leagueMatches = $(element).find('.single_match');

      if (excludedLeagues.includes(leagueName)) {
        return;
      }
      if (leagueName !== currentLeague) {
        currentLeague = leagueName;
        const leagueEmoji = getLeagueEmoji(currentLeague);
        if (command != 'koran') {
          matchesInfo.push(`\n*${leagueEmoji} ${currentLeague}‎*\n‏══════ ⋆★⋆ ══════`);
        }
      }
      leagueMatches.each((index, matchElement) => {
        const teamNames1 = $(matchElement).find('.team.hometeam span.the_team').text().trim();
        const teamNames2 = $(matchElement).find('.team.awayteam span.the_team').text().trim();
        const dateTime = $(matchElement).find('.middle_column.cell.col-2 .match_time .the_otime').text();
        const time = moment(dateTime).subtract(2, 'hours').format('HH:mm');
        const liveStatus = $(matchElement).find('.match_status');
        const matchStatusText = liveStatus.find('span').text().trim().replace(/بين الشوطين/g, '½').replace(/انتهت/g, '✅').replace(/'/g, '"').replace(/تبدأ قريباً/g, '⏳').replace(/ألغيت/g, '❌')
        const matchStatus = '"' + matchStatusText.split('"')[0];
        const mst = matchStatus.replace(/"½/g, '½').replace(/"✅/g, '✅').replace(/""/g, '"').replace(/"⏳/g, '⏳').replace(/"❌/g, '❌');
        const matchScoreElement = $(matchElement).find('.match_score');
        const homeTeamScore = matchScoreElement.find('.hometeam').text();
        const awayTeamScore = matchScoreElement.find('.awayteam').text();
        let liveScore = `${homeTeamScore} - ${awayTeamScore}`;
        let matchResult = ``;
        if (command === 'koran') {
          if (matchStatusText.includes('"')) {
            matchResult += `‏【 *${teamNames1}* *${liveScore}* *${teamNames2}* 】${mst}\n`;
          } else {
            return;
          }
        } else {
          if (command !== 'koran' && liveStatus.text().includes('بدأت')) {
            matchResult += `‏【 *${teamNames1}* ✘ *${teamNames2}* 】${time}\n`;
          } else {
            matchResult += `‏【 *${teamNames1}* *${liveScore}* *${teamNames2}* 】${mst}\n`;
          }
        }

        matchesInfo.push(matchResult);
      });
    });

    return matchesInfo;
  } catch (error) {
    console.error('حدث خطأ أثناء الاتصال بالموقع:', error);
    return null;
  }
};

export default getLiveMatches;
