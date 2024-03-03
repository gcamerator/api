//―――――――――――――――――――――――――――――――――――――――――― ┏ Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const ytdl = require('ytdl-core');
const axios = require('axios');

//―――――――――――――――――――――――――――――――――――――――――― ┏ Api Youtube Downloader ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
        try {
      const formats = await ytdl.getInfo(url)
 resolve({res})
        } catch (err) {
            reject(err);
        }
    });
}
function ytMp3(url) {
    return new Promise(async (resolve, reject) => {
        try {
      const formats = await ytdl.getInfo(url)
 resolve({res})
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { ytMp4, ytMp3};
