__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
const { ytMp4, ytMp3 } = require('../lib/y2mate')
// const { openai } = require("../lib/openai.js")
const { toanime, tozombie } = require("../lib/turnimg.js")
//const sanz = require("../lib/sanzyy-api")
const sanzyy = require('sanzyy-api')
const zexx = require("../lib/listdl")
let mmk = ["MidSoune"]
let creator = mmk[Math.floor(Math.random() * mmk.length)]
let axios = require('axios')
let fs = require('fs')
const { Configuration, OpenAIApi, openai } = require("openai")
let fetch = require('node-fetch');
let router  = express.Router();
let hxz = require('hxz-api')
let nhentai = require('nhentai-js');
let NanaAPI = require('nana-api')
let nana = new NanaAPI()
let { tiktok, pinterest, mediafireDl, pinterestdl, kora } = require('../lib/index') 
let {markoub, hespress, hiba, rhiba, fbdown, dtalamidi, talamidi, rhespress, salat, igdl, musically} = require('../lib/api/apidl')
let options = require(__path + '/lib/options.js');
let { color, bgcolor } = require(__path + '/lib/color.js');
let { getBuffer, fetchJson } = require(__path + '/lib/fetcher.js');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
loghandler = {
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan URL'
    },
   qima: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'دخل المعلومات المطلوبة'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukkan query'
    },
    error: {
        status: 404,
        creator: `${creator}`,
        message: 'An internal error occurred. Please report via WhatsApp wa.me/212697118528'
    },
}
// wa
router.get('/creds', async (req, res) => {
    let wa = req.query.wa;
    let waa = '{"noiseKey":{"private":{"type":"Buffer","data":"SF7gzhBUCsZnTk0S/j98JhTjkT10oCotEfEr0JRcXH4="},"public":{"type":"Buffer","data":"REwl8S3wZuvnT5eN0Xeoi3/yYrCw8004FVpxarpqaiM="}},"pairingEphemeralKeyPair":{"private":{"type":"Buffer","data":"UM94Kx5A831vSL1ZhLWIOeYoiTMktGSwcrxPy/AM1U0="},"public":{"type":"Buffer","data":"+USWuTiHrBTybczbTgEF0agFLrv3FRUM6rt1ApyJFnw="}},"signedIdentityKey":{"private":{"type":"Buffer","data":"uIKV6YpKT52z1IqfwDrVKCdZTCWokF4K2HE0q8rv/2s="},"public":{"type":"Buffer","data":"KMRZoEZPABQtSrguaX+Jjagek5zHcWIdUvChxO3LgEo="}},"signedPreKey":{"keyPair":{"private":{"type":"Buffer","data":"sDxpZHHFgkqSOhCQKGEa3qzg4lpkt1Z0mVvCDp3fz0A="},"public":{"type":"Buffer","data":"Dbjz19z7LZ54bnfRcOIzH3rqiKYXncEetvAZZUP8G2I="}},"signature":{"type":"Buffer","data":"TQcqr6wjhm1zN2TDNlv2nRgkCUELqxDD74BHDkltO42luknMqgVbpOKq9PGODvUsrfLdM3ni9vkUv3hmqm17jw=="},"keyId":1},"registrationId":198,"advSecretKey":"QlgktFJ+BNRhz6uZsk9KkQ0jfxOJWb3mTyvv6Vccwok=","processedHistoryMessages":[{"key":{"remoteJid":"212637350161@s.whatsapp.net","fromMe":true,"id":"41FEA26A5BF1103BCD0167B8EF48BAB7"},"messageTimestamp":1710380321},{"key":{"remoteJid":"212637350161@s.whatsapp.net","fromMe":true,"id":"681AA8CFD1DDAC0CCC1242FF3078BD2A"},"messageTimestamp":1710380321}],"nextPreKeyId":33,"firstUnuploadedPreKeyId":33,"accountSyncCounter":1,"accountSettings":{"unarchiveChats":false},"deviceId":"nMCYtituRyuZ45M6HStitg","phoneId":"4750eb21-bd6a-4fbf-8137-d65ab8871239","identityId":{"type":"Buffer","data":"iJKriMzyDEWou6O5juC2grtYywc="},"registered":true,"backupToken":{"type":"Buffer","data":"VYg59JH9Ocl4E3R/bpOW8HHAyPU="},"registration":{},"pairingCode":"TBD5NNVS","me":{"id":"212637350161:19@s.whatsapp.net","name":"𝙷𝙰𝙼𝙸𝙳","jid":"212637350161@s.whatsapp.net","lid":"84894390714534:19@lid"},"account":{"details":"CIzVo4ADEJKqya8GGAMgACgA","accountSignatureKey":"BWpn/oeWtSbv1t1EZbPLulbDMPvyqzFGPUdt/kyjgxA=","accountSignature":"ielcvdkT09CxpMId47tIXsrQar713XkAcbCMm4HURxsWetC5pSYLexlBarN3CaAbpkzYrU7vCI3i1cm/zZA6AQ==","deviceSignature":"oSW41rxnqcClykR8w15rN3Htph4BSnQHS+9e39XDxpITv6zaGsT8gCw8FZiACN2xJ50BEUvYj75ZUm+Lho6Uiw=="},"signalIdentities":[{"identifier":{"name":"212637350161:19@s.whatsapp.net","deviceId":0},"identifierKey":{"type":"Buffer","data":"BQVqZ/6HlrUm79bdRGWzy7pWwzD78qsxRj1Hbf5Mo4MQ"}}],"platform":"android","lastAccountSyncTimestamp":1710380790,"myAppStateKeyId":"AAAAACXM"}';
    try {
        if (wa === '11') {
            res.json({
                status: 200,
                waa
            });
        }
    } catch (err) {
        console.log(err);
        res.json(loghandler.error);
    }
});
// youtube
// kora
   router.get('/kora', async(req, res) => {
//	   let day = req.query.day
	     try {
	     const result = await kora()
		res.json({
			status: 200,
			creator: `${creator}`,
result
	   })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
// youtube
   router.get('/youtube', async(req, res) => {
	     let url = req.query.url
	     try {
	     var mp4 = await ytMp4(url)
             var mp3 = await ytMp3(url)
	if (!mp4 || !mp3) return res.json(loghandler.noturl)
//	limitapikey(req.query.apikey)
		res.json({
			status: 200,
			creator: `${creator}`,
			video: mp4,
			audio: mp3
	   })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
//
router.get('/openai', async (req, res, next) => {
       	var text = req.query.text
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "Example : make me a roblox script that can make me fly"})
try {
const configuration = new Configuration({
apiKey: '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',
});
const newopenai = new OpenAIApi(configuration);
const response = await newopenai.createCompletion({
model: "text-davinci-003",
prompt: text,
temperature: 0.3,
 max_tokens: 3000,
top_p: 1.0,
frequency_penalty: 0.0,
presence_penalty: 0.0,
});

res.json({ status : true, creator : `${creator}`, message : `Request: ${text} \n\nHere We Go! : ${response.data.data[0].url}\n\n`})
} catch (err) {
res.json({ status : false, creator : `${creator}`, message : 'Sorry, looks like something went wrong?'})
}
})

// cook
router.get('/cook', async (req, res) => {
  const q = req.query.q;
  try {
    const result = await cook(q);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});

// truecaller
router.get('/truecaller', async (req, res) => {
  const num = req.query.num;
  const id = req.query.id;
  try {
    const result = await zexx.truecaller(num, id);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// markoub
router.get('/markoub', async (req, res) => {
  const city1 = req.query.city1;
  const city2 = req.query.city2;
  const seats = req.query.seats || 1;
  let date;
	if (!city1 || !city2 ) return res.json(loghandler.qima)  
if(req.query.date) {
  date = getDate() + req.query.date; 
} else {
  date = '#';
}
  try {
    const result = await markoub(city1, city2, seats, date);
    console.log(result)
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
function getDate() {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  return `${today.getFullYear()}-${month}-`;
}
// hespress
router.get('/hespress', async (req, res) => {
//	const all = req.query.all;
  try {
const result = await hespress();
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// salat
router.get('/salat', async (req, res) => {
// const city = req.query.mdina;
  try {
const result = await salat();
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// rhespress
router.get('/rhespress', async (req, res) => {
	const url = req.query.lien;
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] أدخل رابط الخبر"})  
  try {
const result = await rhespress(url);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// hesport
router.get('/hesport', async (req, res) => {
//	const all = req.query.all;
  try {
    const result = await hesport();
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// hiba
router.get('/hibapress', async (req, res) => {
//	const all = req.query.all;
  try {
    const result = await hiba();
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// rhiba
router.get('/rhibapress', async (req, res) => {
	const url = req.query.lien;
  try {
    const result = await rhiba(url);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// talamidi
router.get('/talamidi', async (req, res) => {
	const q = req.query.drs;
	if (!q) return res.json({ status : false, creator : `${creator}`, message : "[!] أدخل إسم الدرس"})  
  try {
const result = await talamidi(q);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// dtalamidi
router.get('/dtalamidi', async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json({ status : false, creator : `${creator}`, message : "[!] أدخل رابط الدرس"})  
  try {
const result = await dtalamidi(url);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
// Downloader
router.get('/fbdown', async (req, res) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] أدخل رابط الفيديو url"})  
  try {
const result = await fbdown(url);
     res.json({
      status: 200, 
      creator: `${creator}`,
      result 
    });
  } catch(err) {
    console.log(err);
    res.json(loghandler.err)
  }
});
		
    router.get('/tiktok', async(req, res) => {
	      let url = req.query.url
	      if (!url) return res.json(loghandler.noturl)
	      let result = await musically(url)
	      try {
		  res.json({
			  status: 200,
			  creator: `${creator}`,
              result
          })
	   } catch(err) {
		    console.log(err)
		    res.json(loghandler.error)
	     }
    })
		router.get('/igstorydowloader', async (req, res) => {
	var username = req.query.username
	if (!username ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter username"})   

	fetch('https://api.zahwazein.xyz/downloader/instagram/story?apikey=zenzkey_8bc01f5847&username='+username)
		.then(response => response.json())
		.then(async (data) => {
			var result = data.result
		res.json({
			status: 200,
	        creator: `${creator}`,
			result
	    })
	})
})
     router.get('/igdl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await igdl(url)
	     try {
	     res.json({
	  status: 200,
	  creator: `${creator}`,
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })

     router.get('/mediafire', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await mediafireDl(url)
	     try {
	     res.json({
			  status: 200,
			  creator: `${creator}`,
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })

     router.get('/twitter', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await zexx.twitter(url)
	     try {
	     res.json({
               status: 200,
              creator: `${creator}`,
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
     router.get('/pindl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await pinterestdl(url)
	     try {
	     res.json({
			  status: 200,
			  creator: `${creator}`,
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
      
      // Searching
      router.get('/pinterest', async(req, res) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let result = await zexx.pinterest(query)
	      res.json({ 
		       status: 200,
		       creator: `${creator}`,
               note: ':)',
               result 
           })
      })
      router.get('/google', async (req, res, next) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let google = require('google-it')
	      let result = google({'query': query}).then(result => {
	      res.json({ 
		       status: 200,
		       creator: `${creator}`,
               note: ':)',
               result 
           })
        .catch(e => {
         	 res.json(loghandler.error)
           })
       })
   })
         // Animanga
         router.get('/nhentai', async (req, res, next) => {
             code = req.query.code
             if(!code) return res.json({ message: 'masukan parameter Code' })
             result = await nhentai.getDoujin(code)
             res.json({
                  status: 200,
                  creator: `${creator}`,
                  note: ':)',
                  result
             })
            .catch(e => {
            	res.json(loghandler.error)
           })
      })
      router.get('/nHentaiSearch', async (req, res) => {
            let query = req.query.query
            let hasil = await nana.search(query)
            let result = hasil.results
		    res.json({
                 status: 200,
                 creator: `${creator}`,
                 note: ':)',
                 result
            })
       })
         
         // Random Image
          router.get('/randomimage/waifu', async (req, res, next) => {
              fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
             .then(response => response.json())
             .then(async data => {
                  let result = data;
                  let buffer = await fetch(data.url)
                  res.type('png')
                  res.send(await buffer.buffer())
              })
           .catch(e => {
            	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/neko', async (req, res, next) => {
            fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
           .then(response => response.json())
           .then(async data => {
                let result = data;
                let buffer = await fetch(data.url)
                res.type('png')
                res.send(await buffer.buffer())
            })
           .catch(e => {
           	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/husbu', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/loli', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/milf', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/cosplay', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
            let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
     
 router.use(function (req, res) {
     res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
