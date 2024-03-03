//―――――――――――――――――――――――――――――――――――――――――― ┏ Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const ytdl = require('ytdl-core');
const axios = require('axios');

//―――――――――――――――――――――――――――――――――――――――――― ┏ Api Youtube Downloader ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const formatsInfo = await ytdl.getInfo(url);
            const res = formatsInfo.formats.filter(format => format.hasVideo && format.hasAudio);
            resolve({
                name: formatsInfo.videoDetails.title,
                url: res[0].url,
                urll: res[1].url || '',
            });    
        } catch (err) {
            reject(err);
        }
    });
}
function ytMp3(url) {
  return new Promise(async (resolve, reject) => {
        try {
            const formatsInfo = await ytdl.getInfo(url);
            const res = formatsInfo.formats.filter(format => !format.hasVideo && format.hasAudio);
            resolve({
                name: formatsInfo.videoDetails.title,
                url: res
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { ytMp4, ytMp3};
