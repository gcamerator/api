//hespress
import fetch from 'node-fetch';
const handler = async (m) => {
let res = await fetch('https://midsoune-b5be75a7ee15.herokuapp.com/api/hespress')
  let data = await res.json();
  const results = JSON.parse(data.result);
  let message = '';
  for(let result of results) {
     message += `*العنوان:* ${result.title}\n*الرابط:* ${result.url}\n\n`;
    }
   await m.reply(message);
};
handler.command = ['his'];
export default handler;

// markoub
import fetch from 'node-fetch';
const handler = async (m, {args, command}) => {
  if (!args[0]) {
    m.reply(`💡 *طريقة الاستعمال:*\n.${command} المدينة1+المدينة2\n🔦 *أو على شكل:*\n\n.${command} تاريخ_اليوم عدد_الأشخاص المدينة1+المدينة2\n\n🕯️ *مثال:*\n.${command} casablanca+rabat 2 31`); }
  let lblays = args[1];
  let nhar = args[2];
  let [mdina1, mdina2] = args[0].split("+").map((mdina) => mdina.charAt(0).toUpperCase() + mdina.slice(1));
  let response = await fetch(`https://midsoune-b5be75a7ee15.herokuapp.com/api/markoub?city1=${mdina1}&city2=${mdina2}&seats=${lblays}&date=${nhar}`);
  let responseData = await response.json();
  let data = JSON.parse(responseData.result);
  let message = `الرحلات بين ${mdina1} و ${mdina2} بتاريخ ${nhar} لـ ${lblays} أشخاص:\n`;
  for (let i = 0; i < data.length; i++) {
      const trip = data[i];
      if (!trip.voyageId) throw `لا توج رحلات`;
      const timeagdep = trip.agDep.tempsArret.slice(0, 5);
      if (trip.prix !== 0) {
     if (trip.isAvailable === 0) {
message += `
 🚌 *الكار ${i + 1}:* ~${trip.societeNom}~
  `;} else {
message += `
 🚌 *الكار ${i + 1}:* ${trip.societeNom}
 ⏳ *الإنطلاق:* ${timeagdep}
 📍 *العنوان:* ${trip.agDep.adresse}
 💸 *السعر:* ${trip.prix} درهم
  `;}}}
  message + 'ʙʏ ᴍɪᴅsᴏᴜɴᴇ' = message.trim().join("\n________________________\n");;
  await m.reply(message);};
handler.command = ['mrkoub', 'markoub', 'مركوب'];
export default handler;
