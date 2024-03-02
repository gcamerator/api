//―――――――――――――――――――――――――――――――――――――――――― ┏ Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const ytdl = require('ytdl-core');
const axios = require('axios');

//―――――――――――――――――――――――――――――――――――――――――― ┏ Api Youtube Downloader ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) resolve(`${bytes} ${sizes[i]}`);
        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
    });
  };

function ytMp4(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const getUrl = await ytdl.getInfo(url);
            let result = [];

            for (let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container === 'mp4' && item.hasVideo && item.hasAudio) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(bitrate:);
                    result.push({
                        video: item.url,
                        quality: qualityLabel,
                        size: bytes
                    });
                }
            }

let resultFix = result.filter(x => x.video && x.size && x.quality);
if (resultFix.length === 0) {
    resolve([]);
    return;
}
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
            let tiny1 = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[1].video}`);
            let tinyUrl = tiny.data;
            let tinyUrl1 = tiny1.data;
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;

            resolve({
                title,
                result: tinyUrl,
                result: tinyUrl1,
                quality: resultFix[0].quality,
                quality: resultFix[1].quality,
                thumb,
                channel,
                uploadDate,
                desc
            });


        } catch (err) {
            reject(err);
        }
    });
}

function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        audio: item.url,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: tinyUrl,
                size: resultFix[0].size,
                thumb,
                channel,
                uploadDate,
                desc
            });
          }).catch(err => {
            resolve()
        })
    });
}



module.exports = { ytMp4, ytMp3};
