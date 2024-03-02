const cheerio = require('cheerio')
const axios = require('axios')

function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://www.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AXrtxbycu21D7oMwQkFSZ8i7+zi5RTOp4lqiPxEb7mho1AbTXP3jwuhqRDGKZ/fYD6A=\"; _pinterest_sess=TWc9PSZwNWh6SGhlaUI2M0d6OExWN2lnM1VIa2JESjVIcW95YjF0NHBEeWlVWXFvemNFdjJ1R1lFZVlHdzZKd3RZL2p4NGsvRU1WMWJKU09MelhTNjlNZzR0R3ZlMUVCVmFUUDN4d3RMZDR6Sjh4b2JrWnBrWHhBWURLTGFuc1B3aTVRTXJrcWcyR2N3bWVLbDlGTWlRb1ViM0VKK3I0WTQxL3NIZWhSYU1ZSUpjSHZ2MzJiUzVDQnI1ZEdtNWwyTjJZZ0Rnd2htOUhxSXJkemJFb1pyOGw5elBXNFdzSmt1b0FPRFlZWFdhL1RIaGsvd3h6Q25yQmV4ZU5pQnVybFVnMG55UTZ2MDhxZVIzNmtLNSsweXBVMjd4YzZab0hlbHdQbmlHcXlvNW8yUUdzSHpjYm1sdnNJRmM3TjQxU0FmR2I0bFg1eFBCVUpUTkJCenFWUEUvdGVIYklkcnhmUVpqbTA2NlJTMUg0ZWl0d2xhMnNpZjNGenhyc3gzR21CNWJsbzZBNlhUY0VLcHI5anI2SXc1Nm5pVVI0NGhpdFBQRXlNWURTSmRGbHRNSUdqV0YrU2xTRUs2bzVBYVdxV3RtSExTUGc1WnArN0Z5Z0R0akw5YlFpeDZpNTlyNnE0bVBXS0ZqVDZla1o0d3FKKytDMnpkTFVrWE9kamlMV3VLc0orUnpMa1JXRVZRS2VHUmhLaWEzVS9HczY0U2tvZjZLM1BuRzViS3ZwVEdoUzJzV2JRdWV0dDk0Tnk3aTg1d29VQ2p6K3JYVG5WRllrREhlV3BXejdqc0F3NlpzVEY3blRUWEtvMkp1aW9Pa2RKZldkdWxyQjNQelBVdkIyODN6dGF5dlhyaTZRd0tUd1hKdWpCbThBMHEwemtwbC9YWlQ3d1kyTE5pbG5mYzRMWU5kbHUydEFVYkI0Q0htNUk3VTZRcnFjSTVRWWZKdUYwRHlBSXhUQ1FBM3R3VThqejFYcXJISllEQTltQm1obHVlU2ZsaGc1M0pOckJmQytsbTdHK3ZiazFZWmQxRlI3R3ROZTVuMHpTK04zS3daRnlhZFBxUXdMMEhIb1VvMXU2RFk5d3BDMERvcCtMMkNhR21MUWxxSWZTcmxBSDI4cmU1N1pSZXF5bWZlUnluWFZOWDFhd0puOWszcEF6djNOM3h4cWp6VlFwcEdKem9sL1VOYU12UVYxemhmcUZTZDkrZXFoWXU0ZG93dnpMSUJiUkhXVUI2c0Q0VCsyOFo2MkNyaGthbG9heUtpVlIxeXhhRkIvVE1wYlI2Z3hkNkZ2OWVycXd6QWtnY2NoYWVyY21jQ3BzTStwRjRWL2x1V0lPa0hPZVcvcFlPMldKeVFxbDcrby9vblZQZnlWS1haQ2RJTlhLRTZTZHNPMVpNdUFoWGJuZmxqQUtmZGU2LytDU0lHSkd6aDZ0NUtJZEtpQUFXQ09va1lMR1JqdEZURCtSTllzNXdPelp3aFIyQnFkM2lOVXpIbmRLMEFtcCtkL2JDTGhHN3djcTRJU0ZBbThPQTVWVFkzVHVyY1FJeHZSMVFiQWJIODZybVNIcUFSK1BQTGJqenRDLzVIUTZ2Z2Nlb3dDTnYrNDhpKzEyZlptdFIxRlBaWGVXL0h2UHI4RUFsWVZYdjViV29IWHRjTVJ5U2twdWFPVURZVGI2NEpQa052d2RkNHBVOTlkUXJjSmtBVmwvOXpndzVncjJjVG5TTVdFUlRVVVRKZll5R3M4WW16a2tqektjeGhLcmQwYzVHT0FEdktEeTBvSEFYV1VPNHNuNXYmNGlxckFwN2R3RXRXNFBzdFpMNThVOU04eTZBPQ==; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}

module.exports = pinterest
