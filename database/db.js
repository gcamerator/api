const monk = require('monk');
const { color } = require('../lib/color.js');

const url = 'mongodb+srv://midsoune97:ouahs97soune@cluster0.wmsfy2h.mongodb.net/?retryWrites=true&w=majority';
const db = monk(url);

db.then(() => {
  console.log(color('Connected correctly to server', 'green'));
}).catch((e) => {
  console.log(color('Error: ' + e, 'red'));
});

// const moutamadrisCollection = db.get('moutamadris');

const initialData = {
  currlien: 'https://moutamadris.ma/cours/',
  currMsg: '🗄️ *إختر مستواك الدراسي من القائمة التالية:*\n\n*1. الثانية باك*\n*2. اولى باك*\n*3. الجذع مشترك*\n*4. الثالثة اعدادي*\n*5. الثانية اعدادي*\n*6. الأولى اعدادي*\n*7. السادس ابتدائي*\n*8. الخامس ابتدائي*\n*9. الرابع ابتدائي*\n*10. الثالث ابتدائي*\n*11. الثاني ابتدائي*\n*12. الأول ابتدائي*\n*13. دروس ملخصات وتمارين خيار فرنسية وانجليزية*\n\n*0. العودة للصفحة السابقة*',
  links: [],
  msgs: [],
  newmsg: null,
  currstep: 0,
  chosen: 0,
  mada: 0,
  add: 0,
  max: 13,
  download: 0,
  student: null,
  content: []
};

async function seedDatabase() {
  try {
    const existingData = await moutamadrisCollection.findOne({});
    if (existingData) {
      console.log(color('Data already exists in the collection. Skipping insertion.', 'yellow'));
    } else {
      await moutamadrisCollection.insert(initialData);
      console.log(color('Initial data inserted successfully into moutamadris collection.', 'green'));
    }
  } catch (error) {
    console.error(color('Error inserting initial data:', 'red'), error);
  } finally {
    db.close(); // تأكد من إغلاق الاتصال بقاعدة البيانات بعد الانتهاء
  }
}

// seedDatabase();

module.exports = db;
