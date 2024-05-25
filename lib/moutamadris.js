const cheerio = require("cheerio");
const db = require("../database/db");
const moutamadrisCollection = db.get("moutamadris");
const fetch = require("node-fetch");
const home = `🗃️ *إختر من القائمة التالية:*\n\n📁 *1. الدروس و التمارين*\n📁 *2. الإمتحانات*\n📁 *3. الفروض*\n📁 *4. العطل*\n📁 *5. المباريات*\n📁 *6. التوجيه*\n📁 *7. الوظائف*\n📁 *8. الجذاذات*`;
async function saveDataToDB(res, user) {
    const data = {
        chose: res.chose,
        user: user,
        currlien: res.currlien,
        currMsg: res.currMsg,
        links: res.links,
        newmsg: res.newmsg,
        chosen: res.chosen,
        mada: res.mada,
        add: res.add,
        max: res.max,
        download: res.download,
        student: res.student,
        content: res.content,
        currstep: res.currstep,
    };

    try {
        // استخدم userID كمعرف فريد لتحديد كل مستخدم
        await moutamadrisCollection.update(
            { user: user }, // شرط البحث لتحديد المستخدم
            { $set: data }, // البيانات التي سيتم تحديثها
            { upsert: true } // إنشاء مستند جديد إذا لم يتم العثور على المستخدم
        );
    } catch (error) {
        console.error("ERROR SAVING DATA TO DB FOR USER:", res.user, error);
    }
}

class Moutamadris {
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async loadDataFromDB(user) {
        try {
            const userData = await moutamadrisCollection.findOne({ user: user });
            if (userData) {
                console.log('User data loaded successfully');
                return userData;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }

    async Start(user) {
        const home = `🗃️ *إختر من القائمة التالية:*\n\n📁 *1. الدروس و التمارين*\n📁 *2. الإمتحانات*\n📁 *3. الفروض*\n📁 *4. العطل*\n📁 *5. المباريات*\n📁 *6. التوجيه*\n📁 *7. الوظائف*\n📁 *8. الجذاذات*`;
        this.currstep = 1;
        this.homelink = "https://moutamadris.ma/";
        this.currlien = null;
        this.links = [];
        this.newmsg = null;
        this.chosen = null;
        this.mada = null;
        this.add = 0;
        this.max = 8;
        this.download = false;
        this.student = null;
        this.content = [];
        this.currMsg = home;
        this.user = user;
        let result = {
            user: this.user,
            currlien: this.currlien,
            max: this.max,
            currMsg: this.currMsg,
            links: this.links,
            newmsg: this.newmsg,
            chosen: this.chosen,
            mada: this.mada,
            add: this.add,
            download: this.download,
            student: this.student,
            content: this.content,
            currstep: this.currstep
        };
        saveDataToDB(result, this.user);
        return result;
    }
    async Choice(choice, step, data) {

        console.log('choice', choice, 'step', step, 'chosen', data.chosen)
        if(choice == 0){
            step = step - 1;
            choice = data.chose;
        }
        console.log(choice)

        this.homelink = "https://moutamadris.ma/";
        this.user = data.user;
        this.currlien = data.currlien;
        this.currMsg = data.currMsg;
        this.links = data.links;
        this.newmsg = data.newmsg;
        this.chosen = data.chosen;
        this.mada = data.mada;
        this.add = data.add;
        this.max = data.max;
        this.download = data.download;
        this.student = data.student;
        this.content = data.content;
        this.currstep = data.currstep;

        const examLinks = {
            1: "examens-2bac/",
            2: "امتحانات-البكالوريا-الدولية-خيار-فرن/",
            3: "امتحانات-وطنية-البكالوريا-المهنية/",
            4: "examens-1bac/",
            5: "examens-3college/",
            6: "examens-6primaire/",
        };
        const otal = {
            1: "لائحة-العطل-المدرسية-بالمغرب/",
            2: "لائحة-العطل-الجامعية-بالمغرب/",
        };
        const forodLinks = {
            1: "فروض-الثانية-باك/",
            2: "فروض-اولى-باك/",
            3: "فروض-جدع-مشترك/",
            4: "فروض-للسنة-الثالثة-اعدادي/",
            5: "فروض-للسنة-الثانية-اعدادي/",
            6: "فروض-للسنة-الاولى-اعدادي/",
            7: "فروض-المستوى-السادس-ابتدائي/",
            8: "فروض-المستوى-الخامس-ابتدائي/",
            9: "فروض-المستوى-الرابع-ابتدائي/",
            10: "فروض-المستوى-الثالث-ابتدائي/",
            11: "فروض-المستوى-الثاني-ابتدائي/",
            12: "فروض-المستوى-الاول-ابتدائي/",
            13: "devoirs/",
        };
        const dorosLinks = {
            1: "الثانية-باكالوريا/",
            2: "اولى-باك/",
            3: "الجذع-المشترك/",
            4: "الثالثة-اعدادي/",
            5: "الثانية-اعدادي/",
            6: "الاولى-اعدادي/",
            7: "السادس-ابتدائي/",
            8: "الخامس-ابتدائي/",
            9: "الرابع-ابتدائي/",
            10: "الثالث-ابتدائي/",
            11: "الثاني-ابتدائي/",
            12: "الاول-ابتدائي/",
            13: "international/",
        };
        const jodLinks = {
            1: "جذاذات-المستوى-الاول-ابتدائي/",
            2: "جذاذات-المستوى-الثاني-ابتدائي/",
            3: "جذاذات-المستوى-الثالث-ابتدائي/",
            4: "جذاذات-المستوى-الرابع-ابتدائي/",
            5: "جذاذات-المستوى-الخامس-ابتدائي/",
            6: "جذاذات-المستوى-السادس-ابتدائي/",
        };
        if (step == 0){this.currMsg = home;
                      this.currstep = 1;
                      this.homelink = "https://moutamadris.ma/";
                      this.currlien = null;
                      this.links = [];
                      this.newmsg = null;
                      this.chosen = null;
                      this.mada = null;
                      this.add = 0;
                      this.max = 8;
                      this.download = false;
                      this.student = null;
                      this.content = [];
                      this.currMsg = home;
                      this.user = user;}
        else if (step == 1) {
            if (choice == 1) {
                this.currlien = this.homelink + "cours/";
                this.currMsg =
                    "🗄️ *إختر مستواك الدراسي من القائمة التالية:*\n\n*1. الثانية باك*\n*2. اولى باك*\n*3. الجذع مشترك*\n*4. الثالثة اعدادي*\n*5. الثانية اعدادي*\n*6. الأولى اعدادي*\n*7. السادس ابتدائي*\n*8. الخامس ابتدائي*\n*9. الرابع ابتدائي*\n*10. الثالث ابتدائي*\n*11. الثاني ابتدائي*\n*12. الأول ابتدائي*\n*13. دروس ملخصات وتمارين خيار فرنسية وانجليزية*\n\n*0. العودة للصفحة السابقة*";
                this.chosen = choice;
                 this.max = 13;
            } else if (choice == 2) {
                this.currlien = this.homelink + "examens/";
                this.currMsg =
                    "🗄️ *إختر مستواك الدراسي من القائمة التالية:*\n\n*1. امتحانات وطنية الثانية باك*\n*2. امتحانات البكالوريا الدولية*\n*3. امتحانات البكالوريا المهنية*\n*4. امتحانات جهوية اولى باك*\n*5. امتحانات الثالثة اعدادي*\n*6. امتحانات السادس ابتدائي*\n\n*0. العودة للصفحة السابقة*";
                this.chosen = choice;
                 this.max = 6;
            } else if (choice == 3) {
                this.currlien = this.homelink + "forod/";
                this.currMsg =
                    "🗄️ *إختر مستواك الدراسي من القائمة التالية:*\n\n*1. الثانية باك*\n*2. اولى باك*\n*3. الجذع مشترك*\n*4. الثالثة اعدادي*\n*5. الثانية اعدادي*\n*6. الأولى اعدادي*\n*7. السادس ابتدائي*\n*8. الخامس ابتدائي*\n*9. الرابع ابتدائي*\n*10. الثالث ابتدائي*\n*11. الثاني ابتدائي*\n*12. الأول ابتدائي*\n*13. فروض مسلك دولي خيار فرنسية مع التصحيح*\n\n*0. العودة للصفحة السابقة*";
                this.chosen = choice;
                 this.max = 13;
            } else if (choice == 4) {
                this.currMsg =
                    "🏫 *إختر مكان دراستك من القائمة التالية:*\n\n*1. لائحة العطل المدرسية*\n*2. لائحة العطل الجامعية*\n\n*0. العودة للصفحة السابقة*";
                 this.max = 2;
                this.chosen = choice;
            } else if (choice == 5) {
                this.currlien = this.homelink + "concours/";
                this.currMsg =
                    "⚠️ *لا توجد تحديث في الموقع، فقط البيانات القديمة*\n\n*0. العودة للصفحة السابقة*";
                 this.max = 0;
                this.chosen = choice;
            } else if (choice == 6) {
                this.currlien = this.homelink + "orientation/";
                this.chosen = choice;
                const response = await fetch(this.currlien);
                const data = await response.text();
                const $ = cheerio.load(data);
                const pdfLinks = [];
                $(".entry-content a").each((index, element) => {
                    const link = $(element).attr("href");
                    if (
                        link &&
                        (link.endsWith(".pdf") ||
                            link.endsWith(".docx") ||
                            link.endsWith(".zip"))
                    ) {
                   pdfLinks.push(decodeURIComponent(link));
                    }
                });
                const linkTexts = pdfLinks.map((link) =>
                    link
                        .split("/")
                        .pop()
                        .replace(".pdf", "")
                        .replace(/-/g, " ")
                        .trim(),
                );
               
                const aa = linkTexts
                    .map((item, index) => `📂 *${index + 1}. ${item}*`)
                    .join("\n");
                const aaa =
                    "🗃️ *إختر الملف لتحميله:*\n\n" +
                    aa +
                    "\n\n*0. العودة للصفحة السابقة*";
                this.links = pdfLinks;
                this.max = this.links.length;
                this.currMsg = aaa;
                this.download = false;
            } else if (choice == 7) {
                this.currlien = this.homelink + "concours/";
                this.currMsg =
                    "📑 *إختر من القائمة التالية:*\n\n▪️ *مباريات التوظيف بوزارة الداخلية:*\n*1. الأمن الوطني*\n*2. مباراة الجمارك*\n*3. مباراة الوقاية المدنية*\n*4. القوات المساعدة*\n*5. القوات المسلحة*\n*6. التجنيد الاجباري*\n*7. الدرك الملكي*\n*8. Concours Police*\n*9. Forces Armées Royales*\n*10. Gendarme Royale*\n*11. Concours Douanes*\n\n▪️ *المواقع الرسمية للمباريات الأمنية والعسكرية:*\n*12. Tajnid.ma*\n*13. Recrutement.far.ma*\n*14. Recrutement.gr.ma*\n*15. Recrutement.fa.gov.ma*\n*16. Concours.dgsn.gov.ma*\n\n▪️ *مباريات التوظيف في القطاع العام:*\n*17. مباراة التعليم*\n*18. Concours ONCF*\n*19. Concours ministère de la santé*\n\n▪️ *البحث عن الوظيفة:*\n*20. Emploi Public*\n*21.قرعة امريكا*\n*22.أنابيك Anapec*\n\n▪️ *مباريات التوظيف في القطاع الخاص*\n*23. Attijariwafa Bank*\n*24. Al Barid Bank*\n\n*25. Marjane*\n*26. Bank Al Maghrib*\n*27. Carrefour Market*\n*28. Label’Vie*\n*29. Aswak Assalam*\n\n▪️ *مباريات التوظيف حسب المدن:*\n*30. Recrutement et Emploi Tanger*\n\n*0. العودة للصفحة السابقة*";
                this.chosen = choice;
                 this.max = 30;
            } else if (choice == 8) {
                this.currlien = this.homelink + "jodadat/";
                this.currMsg =
                    "📋 *إختر من القائمة التالية:*\n\n*1.جذاذات المستوى الاول*\n*2. جذاذات المستوى الثاني*\n*3. جذاذات المستوى الثالث*\n*4. جذاذات المستوى الرابع*\n*5. جذاذات المستوى الخامس*\n*6. جذاذات المستوى السادس*\n\n*0. العودة للصفحة السابقة*";
                this.chosen = choice;
                 this.max = 6;
            }
    
        } 
        else if (step == 2) {
            if (this.chosen == 1) {
                if (dorosLinks[choice]) {
                    this.currlien = this.homelink + dorosLinks[choice];
                    try {
                        const response = await fetch(this.currlien);
                        const data = await response.text();
                        const $ = cheerio.load(data);
                        const results = [];
                        let pdfLinks = [];
                        $(".entry-content .mada a").each((index, element) => {
                            const title = $(element).text();
                            const link = $(element).attr("href");
                            pdfLinks.push(decodeURIComponent(link));
                            results.push({ title });
                        });

                        this.links = pdfLinks;
                        this.max = this.links.length;
                        const aa = results
                            .map(
                                (item, index) =>
                                    `📗 *${index + 1}. ${item.title}*`,
                            )
                            .join("\n");
                        const aaa =
                            "📚 *إختر المادة:*\n\n" +
                            aa;

                        this.currMsg = aaa;
                        this.add = 1;
                    } catch (error) {
                        console.error("Error:", error);
                    }

                }

            } 
            else if (this.chosen == 2) {
                if (examLinks[choice]) {
                    this.currlien = this.homelink + examLinks[choice];
                    try {
                        const response = await fetch(this.currlien);
                        const data = await response.text();
                        const $ = cheerio.load(data);
                        const results = [];
                        let pdfLinks = [];
                        $(".entry-content .mada a").each((index, element) => {
                            const title = $(element).text();
                            const link = $(element).attr("href");
                             pdfLinks.push(decodeURIComponent(link));
                                results.push({ title });
                        });
                          const aa = results
                            .map(
                                (item, index) =>
                                    `📗 *${index + 1}. ${item.title}*`,
                            )
                            .join("\n");
                        const aaa =
                            "📚 *إختر المادة:*\n\n" +
                            aa;
                        this.links = pdfLinks;
                        this.currMsg = aaa;
                        this.add = 0;
                        this.max = this.links.length;
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }
            } 
            else if (this.chosen == 3) {
                if (forodLinks[choice]) {
                    this.currlien = this.homelink + forodLinks[choice];
                    try {
                        const response = await fetch(this.currlien);
                        const data = await response.text();
                        const $ = cheerio.load(data);
                        const results = [];
                        let pdfLinks = [];
                        $(".entry-content .mada a").each((index, element) => {
                            const title = $(element).text();
                            const link = $(element).attr("href");
                             pdfLinks.push(decodeURIComponent(link));
                                results.push({ title });
                        });
                        const aa = results
                            .map(
                                (item, index) =>
                                    `📗 *${index + 1}. ${item.title}*`,
                            )
                            .join("\n");
                        const aaa =
                            "📚 *إختر المادة:*\n\n" +
                            aa;
                        this.add = 0;
                        this.links = pdfLinks;
                        this.max = this.links.length;
                        this.currMsg = aaa;
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }
            } 
            else if (this.chosen == 4) {
                if (otal[choice]) {
                    this.currlien = this.homelink + otal[choice];

                    const response = await fetch(this.currlien);
                    const data = await response.text();
                    const $ = cheerio.load(data);
                    const cont =
                        "📆 *لائحة العطل لهذه السنة:*\n\n" +
                        $(".entry-content p:eq(2)")
                            .text()
                            .replace(/\العطلة/g, "+ العطلة")
                            .replace(/\عطلة/g, "+ عطلة");
                    const img = $(".entry-content img").attr("src");
                     this.currlien = img;
                    this.currMsg = cont;
                    this.download = true;
                    this.max = 0;
                }
            } 
            else if (this.chosen == 6) {
                if (this.links[choice - 1]) {
                    let url = this.links[choice - 1];
                    if (url.includes(" ")) {
                        this.currlien = url.trim().replace(" ", "");
                    } else {
                        this.currlien = url;
                    }
                    this.download = true;
                    this.currMsg = 'ɪɢ: ᴍɪᴅsᴏᴜɴᴇ';
                    this.max = 0;

                }
            } 
            else if (this.chosen == 7) {
                this.currMsg =
                    "*لا يوجد تحديث وظائف جديدة في الموقع، فقط البيانات القديمة*";
                    this.max = 0;
            }
            else if (this.chosen == 8) {
                if (jodLinks[choice]) {
                    this.currlien = this.homelink + jodLinks[choice];
                    const response = await fetch(this.currlien);
                    const data = await response.text();
                    const $ = cheerio.load(data);
                    const results = [];
                    let pdfLinks = [];
                    $(".entry-content .read li.medium-7.column a").each(
                        (index, element) => {
                            const title = $(element).text();
                            const link = $(element).attr("href");
                             pdfLinks.push(decodeURIComponent(link));
                                results.push({ title });
                        },
                    );
                      const aa = results
                        .map(
                            (item, index) => `📕 *${index + 1}. ${item.title}*`,
                        )
                        .join("\n");
                    const aaa =
                        "📚 *إختر المادة:*\n\n" +
                        aa;
                    this.links = pdfLinks
                    this.currMsg = aaa;
                    this.add = 0;
                    this.max = this.links.length;
                }
            }
        }
        else if (step == 3) {
            if (this.links[choice - 1]) {
                const c1n = ["1", "2", "6", "10", "8", "15", "17", "18", "25"];
                const c2n = ["1", "2", "5", "12", "8", "14", "15"];
                const c3n = ["3", "6", "8", "11", "12", "13", "14", "17", "18"];
                const c4n = ["1", "2", "3", "4", "6", "7", "8", "13"];
                const c5n = ["1", "2", "3", "4", "6", "11"];
                const c6n = ["1", "2", "3", "4", "6", "11"]; 
                const c7n = ["1", "2", "3", "4", "6"]; // 6
                const c8n = ["1", "2", "3", "5", "6"]; // 5
                if ((c1n.includes(choice) && this.mada == 1) || (c2n.includes(choice) && this.mada == 2) || (c3n.includes(choice) && this.mada == 3) || (c4n.includes(choice) && this.mada == 4) || (c5n.includes(choice) && this.mada == 5) || (c7n.includes(choice) && this.mada == 7) || (c8n.includes(choice) && this.mada == 8) || (c6n.includes(choice) && this.mada == 6) && this.chosen == 1 && this.add == 1) {
                    try {
                        this.currlien = this.links[choice - 1];
                        const response = await fetch(this.currlien);
                        const data = await response.text();
                        const $ = cheerio.load(data);
                        const results = [];
                        const pdfLinks = [];
                        $("li.medium-8.column p a").each((index, element) => {
                            const title = $(element).text();
                            const link = $(element).attr("href");
                             pdfLinks.push(decodeURIComponent(link));
                                results.push({ title });
                        });
                         const aa = results
                            .map(
                                (item, index) =>
                                    `📃 *${index + 1}. ${item.title}*`,
                            )
                            .join("\n");
                        const aaa =
                            "📖 *إختر الدرس:*\n\n" +
                            aa;
                        this.links = pdfLinks;
                        this.max = this.links.length;
                        this.currMsg = aaa;
                        this.add = 1;

                    } catch (error) {
                        console.error("Error:", error);
                    }
                } else if (this.add == 0) {
                    this.currlien = this.links[choice - 1];
                    const response = await fetch(this.currlien);
                    const data = await response.text();
                    const $ = cheerio.load(data);
                    const pdfLinks = [];
                    $(".entry-content a").each((index, element) => {
                        const link = $(element).attr("href");
                        if (
                            link &&
                            (link.endsWith(".pdf") ||
                                link.endsWith(".docx") ||
                                link.endsWith(".zip"))
                        ) {
                            pdfLinks.push(decodeURIComponent(link));
                        }
                    });
                    const linkTexts = pdfLinks.map((link) => {
                        const fileName = link
                            .split("/")
                            .pop()
                            .replace(".pdf", "")
                            .replace(/-/g, " ")
                            .trim();
                        return fileName;
                    });
       
                    const aa = linkTexts
                        .map((item, index) => `📂 *${index + 1}. ${item}*`)
                        .join("\n");
                    const aaa =
                        "🗃️ *إختر الملف لتحميله:*\n\n" +
                        aa;

                    this.links = pdfLinks;
                    this.max = this.links.length;
                    this.currMsg = aaa;
                    this.download = true;    
                    this.add = 0;

                }
            }
        } 
        else if (step == 4) {
            if (this.add == 1) {
                this.currlien = this.links[choice - 1];
                const response = await fetch(this.currlien);
                const data = await response.text();
                const $ = cheerio.load(data);
                const pdfLinks = [];

                $(".entry-content a").each((index, element) => {
                    const link = $(element).attr("href");
                    if (
                        link &&
                        (link.endsWith(".pdf") ||
                            link.endsWith(".docx") ||
                            link.endsWith(".zip"))
                    ) {
                        pdfLinks.push(decodeURIComponent(link));
                    }
                });
                const linkTexts = pdfLinks.map((link) => {
                    const fileName = link
                        .split("/")
                        .pop()
                        .replace(".pdf", "")
                        .replace(/-/g, " ")
                        .trim();
                    return fileName;
                });
                const aa = linkTexts
                    .map((item, index) => `📂 *${index + 1}. ${item}*`)
                    .join("\n");
                const aaa =
                    "🗃️ *إختر الملف لتحميله:*\n\n" +
                    aa;
                this.links = pdfLinks
                this.max = this.links.length;
                this.currMsg = aaa;
                this.add = 0;
            }
            else if (this.add == 0){
                if (this.links) {
                    let url = this.links[choice - 1];
                    if (url.includes(" ")) {
                        this.currlien = url.trim().replace(" ", "");
                    } else {
                        this.currlien = url;
                    }
                    this.download = true;
                    this.currlien = this.currlien;
                    this.currMsg = 'ɪɢ: ᴍɪᴅsᴏᴜɴᴇ';
                    this.max = 0;
                }
            }
        }
        else if (step == 5) {
                let url = this.links[choice - 1];
                if (url.includes(" ")) {
                    this.currlien = url.trim().replace(" ", "");
                } else {
                    this.currlien = url;
                }
                this.download = true;
                this.currlien = this.currlien;
                this.currMsg = 'ɪɢ: ᴍɪᴅsᴏᴜɴᴇ';
                this.max = 0;
        }
        this.currstep += 1;
        await this.delay(1500);
        let result = {
            chose: choice,
            user: this.user,
            currlien: this.currlien,
            max: this.max,
            currMsg: this.currMsg,
            links: this.links,
            newmsg: this.newmsg,
            chosen: this.chosen,
            mada: this.mada,
            add: this.add,
            download: this.download,
            student: this.student,
            content: this.content,
            currstep: this.currstep,
        };

        saveDataToDB(result, this.user);
        await this.delay(500);
        return result;
    }
}

module.exports = Moutamadris;
