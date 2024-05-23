let __path = process.cwd(),
monk = require('monk'),
{ color } = require(__path + '/lib/color.js')

// Connection URL
let url = 'mongodb+srv://midsoune97:ouahs97soune@cluster0.wmsfy2h.mongodb.net/?retryWrites=true&w=majority';
try {
if(url == 'https://midsouneapi-fee7b0be8faf.herokuapp.com') throw console.log(color('Check the database configuration, the url var has not been filled in','red'));
} catch (e) {
return;
}
let db = monk(url);

db.then(() => {
  console.log(color('Connected correctly to server','green'))
})
.catch ((e) => {
  console.log(color('Error : '+ e +'\n\nFailed to connect to the database, \ncheck the database configuration whether the Connection URL is correct','red'))
})
module.exports = db
