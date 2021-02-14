const puppeteer = require('puppeteer');
// const app = require('express')();
const fs = require('fs');

// scraping for the key words:

(scrap = async () => {
    // wanted url
    const url = 'https://unogs.com/search/matrix'
    //browser initiate
    const browser = await puppeteer.launch({ headless: false });  // { headless: false }
    // opening a new blank page
    const page = await browser.newPage();
    // navigate to url and wait until page loads completely 
    // await page.goto('https://unogs.com/search/:searchContent', { waitUntil: 'domcontentloaded' });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // evaluate will run the code inside its function as if it was on the browser
    const resultList = await page.evaluate(() => {
        const resultsArray = [];
        [...document.querySelectorAll('div[class="videodiv img-rounded"]')].forEach(result => {
            const resultName = result.querySelectorAll('div')[2].querySelector('b > span').innerText;
            const resultImgUrl = result.querySelector('img').src;
            const resultDesc = result.querySelectorAll('div')[2].querySelectorAll('span')[3].innerText;

            const resultInfo = {
                name: resultName,
                imgUrl: resultImgUrl,
                desc: resultDesc,
            };
            resultsArray.push(resultInfo);
        });
        return resultsArray;
    });

    await page.click('div[class="sclist img-rounded"]');
    await page.waitForSelector('div[class="sclist img-rounded"]');
    const contriesList = await page.evaluate(() => {
        const VpnCountriesDivList = document.querySelectorAll('div[class="img-rounded clistdiv"]');
        const VpnCountriesNameAndImgList = [...VpnCountriesDivList].map(span =>
            ({
                countysName: span.querySelector('span').innerText,
                countysFlag: span.querySelector('img').src
            }));
        return [...VpnCountriesDivList];
    });
    console.log(contriesList);
    await browser.close();

    const data = resultList.map(result => ({ ...result, vpnCountries: "contriesList" }));



    // creating the json file
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) { console.log(err) }
        else { console.log('Saved Successfully!') }
    })
})();


// app.listen(5050, () => {
//     console.log("app is running on port 5050");
//     convert();
// });
