require('dotenv').config();
const fs = require('fs');
const path = require('path');
(async()=>{
    const regex_is_num = /^\d+$/;
    const years = fs.readdirSync('./').filter(v=>regex_is_num.test(v));
    const days = []
    for (const year of years) {
        const folders = fs.readdirSync(`./${year}`);
        for (const day of folders) {
            days.push({
                target: path.join(year,day,'input.txt'),
                url: `https://adventofcode.com/${year}/day/${parseInt(day)}/input`
            });
        }
    }

    for (const day of days) {
        if (fs.existsSync(`./${day.target}`)) continue;

        const result = await fetch(day.url,{
            method: 'GET',
            headers: {
                cookie: `session=${process.env.TOKEN}`
            }
        });

        const text = await result.text();

        fs.writeFileSync(day.target,text);
    }
    console.log(`Fetched all days`);
})()

