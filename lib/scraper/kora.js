const cheerio = require("cheerio")
const fetch = require('node-fetch')
const moment = require('moment')

 function kora() {
  return new Promise((resolve, reject) => {
    const url = 'https://jdwel-com.translate.goog/today/?_x_tr_sl=ms&_x_tr_tl=en&_x_tr_hl=ar&_x_tr_pto=wapp';
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

        const json = '[{\"title\":\"\\\"اتحاد مغاربي من 3 دول\\\" .. مناورة جزائرية تستهدف تقسيم بلدان المنطقة\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2022/11/Obstacle-du-maghreb.jpg\",\"url\":\"https://www.hespress.com/اتحاد-مغاربي-من-ثلاث-دول-مناورة-جزائر-1325252.html\"},{\"title\":\"سفير أذريبجان يزور مقر هسبريس بالرباط\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/Azerbaidjan-hespress1-1.jpg\",\"url\":\"https://www.hespress.com/سفير-أذريبجان-يزور-مقر-هسبريس-بالرباط-1325424.html\"},{\"title\":\"البياض يحسم المواجهة بين الوداد والزمامرة\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/wac.jpeg\",\"url\":\"https://www.hespress.com/البياض-يحسم-المواجهة-بين-الوداد-والزم-1325400.html\"},{\"title\":\"القضاء ينظر في ملفات متضررين مغاربة من ممارسات بنوك ومدارس خاصة\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/01/tribunal-copie-13.jpg\",\"url\":\"https://www.hespress.com/القضاء-ينظر-في-ملفات-متضررين-مغاربة-من-1325299.html\"},{\"title\":\"اندرايف تمنح عمرة مجانية للسائقين بالمغرب\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/indrive.jpg\",\"url\":\"https://www.hespress.com/اندرايف-تمنح-عمرة-للسائقين-في-المغرب-1325377.html\"},{\"title\":\"السكك الحديدية تطلق \\\"عروض عيد المرأة\\\"\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2022/04/gare-train-800-1.jpg\",\"url\":\"https://www.hespress.com/السكك-الحديدية-تطلق-عروض-عيد-المرأة-1325368.html\"},{\"title\":\"المغرب يجدد التضامن الكامل مع فلسطين\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/bourita.jpg\",\"url\":\"https://www.hespress.com/المغرب-يجدد-التضامن-الكامل-مع-فلسطين-1325365.html\"},{\"title\":\"شكاية إلى النيابة العامة تطالب بالتحقيق مع زعماء أحزاب في \\\"دعم الدراسات\\\"\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2023/03/Des-partis-politiques-voleurs.jpg\",\"url\":\"https://www.hespress.com/شكاية-إلى-النيابة-العامة-تطالب-بالتحق-1325320.html\"},{\"title\":\"بايدن يحذر من خطورة الوضع في قطاع غزة\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/biden-1.jpg\",\"url\":\"https://www.hespress.com/بايدن-يحذر-من-خطورة-الوضع-في-قطاع-غزة-1325344.html\"},{\"title\":\"السيدة الأولى لكوت ديفوار تحل بالمغرب\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/Dominique-Ouattara-Cote-dIvoire-Princesse-Lalla-Asmae.jpeg\",\"url\":\"https://www.hespress.com/السيدة-الأولى-لكوت-ديفوار-تحل-بالمغرب-1325338.html\"},{\"title\":\"الصفقات العمومية والاختلاس\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/corruption-caricature.jpg\",\"url\":\"https://www.hespress.com/الصفقات-العمومية-والاختلاس-1325023.html\"},{\"title\":\"حزب الاستقلال يستعد للمؤتمر الثامن عشر\",\"image\":\"https://i1.hespress.com/wp-content/uploads/2024/03/parti-istiqlal-reunion-1.jpg\",\"url\":\"https://www.hespress.com/حزب-الاستقلال-يستعد-للمؤتمر-الثامن-عش-1325234.html\"}]';
         // JSON.stringify(matches);
        resolve(json);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        reject(error);
      });
  });
}

module.exports = kora 
