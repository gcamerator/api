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
