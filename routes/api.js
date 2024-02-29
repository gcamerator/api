__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
const { ytMp4, ytMp3 } = require('../lib/y2mate')
const { openai } = require("../lib/openai.js")
const { toanime, tozombie } = require("../lib/turnimg.js")
//const sanz = require("../lib/sanzyy-api")
const sanzyy = require('sanzyy-api')
const zexx = require("../lib/listdl")
let mmk = ["MidSoune"]
let creator = mmk[Math.floor(Math.random() * mmk.length)]
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router  = express.Router();
let hxz = require('hxz-api')
let nhentai = require('nhentai-js');
let NanaAPI = require('nana-api')
let nana = new NanaAPI()
let { tiktok, pinterest, mediafireDl, doujindesu, pinterestdl } = require('../lib/index') 
let {markoub, hespress, hiba, rhiba, talamidi, rhespress, salat} = require('../lib/api/apidl')
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
const city = req.query.mdina;
  try {
const result = await zexx.salat(city);
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
      status: 2100, 
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
//	const url = req.query.lien;
  try {
    const result = await hiba(url);
     res.json({
      status: 2100, 
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
// Downloader
router.get('/fbdown', async (req, res) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})  
zexx.fbdown(url).then(data => {
	if (!data.Normal_video ) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
})

		
    router.get('/tiktok', async(req, res) => {
	      let url = req.query.url
	      if (!url) return res.json(loghandler.noturl)
	      let result = await zexx.musically(url)
	      try {
		  res.json({
			  status: 200,
			  creator: `${creator}`,
              note: 'TT',
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
			result: result
	    })
	})
})
    router.get('/igdl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     try {
	     fetch('https://api.akuari.my.id/downloader/igdl2?link=' + url)
		.then(response => response.json())
		.then(async (data) => { 
		var result = data.respon
		res.json({
			status: 200,
	        creator: `${creator}`,
			result: result
	    })
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
              note: 'MD',
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
     router.get('/youtube', async(req, res) => {
	     let url = req.query.url
	     try {
	     var mp3 = await ytMp3(url)
	var mp4 = await ytMp4(url)
	if (!mp4 || !mp3) return res.json(loghandler.noturl)
	limitapikey(req.query.apikey)
		res.json({
			status: 200,
			creator: `${creator}`,
			result:{ 
			title: mp4.title,
			desc: mp4.desc,
			thum: mp4.thumb,
			view: mp4.views,
			channel: mp4.channel,
			uploadDate: mp4.uploadDate,
			mp4:{
				result: mp4.result,
				size: mp4.size,
				quality: mp4.quality
			},
			mp3:{
				result: mp3.result,
				size: mp3.size
			}
		 }
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
              note: 'TW',
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
              note: 'PT',
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
       router.get('/doujindesuSearch', async (req, res) => {
             let query = req.query.query
             let result = await doujindesu(query)
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
