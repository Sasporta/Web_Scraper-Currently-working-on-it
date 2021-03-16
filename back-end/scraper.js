const puppeteer = require('puppeteer');
const app = require('express')();
const fs = require('fs');

// scraping for the key words:
const scrap = async (searchContent) => {
    // wanted url
    const url = `https://unogs.com/search/${searchContent}`
    // browser initiate
    const browser = await puppeteer.launch({ headless: false });  // { headless: false }
    // opening a new blank page
    const page = await browser.newPage();
    // navigate to url and wait until page loads completely 
    await page.goto(url, { waitUntil: 'networkidle2' });

    await autoScroll(page);

    // evaluate will run the code inside its function as if it was on the browser
    // this evaluate will scrap the document and will return an array of objects with the name, img url and description inside them
    const resultList = await page.evaluate(() => {
        const resultsArray = [];
        document.querySelectorAll('div[class="videodiv img-rounded"]').forEach(result => {
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

    // to open all the results lists, first we need to create a variable that holds all the lists divs
    // const resultsdivs = await page.$$('div[class="listdiv"] > div[class="titleitem"] > div[class="videodiv img-rounded"]');
    const resultsdivs = await page.$$('div[class="videodiv img-rounded"]');
    console.log(resultsdivs.length);
    const resultCountryList = [];
    // to get the country list of each result we need to open the list, scrap it, and close it by order
    for (let div of resultsdivs) {
        // clicking each result div to open its countries list
        await div.click();
        // waiting until the wanted div is loaded
        await page.waitForSelector('div[class="img-rounded clistdiv"]', { visible: true });
        // this evaluate will scrap the document and will return an array of objects with the country name and its flag pictur url inside them
        const contriesList = await page.evaluate(() => {
            const VpnCountriesDivList = document.querySelectorAll('div[class="img-rounded clistdiv"]');
            const VpnCountriesNameAndImgList = [...VpnCountriesDivList].map(span =>
            ({
                countysName: span.querySelector('span').innerText,
                countysFlag: span.querySelector('img').src
            }));
            return VpnCountriesNameAndImgList;
        });
        resultCountryList.push(contriesList);
        // after we finish scrap the info needed from the page - close the page
        await page.keyboard.press('Escape');
        // wait for a bit before starting with the next result (needed to prevent functions from executing in the smae time)
        await page.waitForTimeout(1000);
    };
    // when finish, close the browser
    await browser.close();
    // console.log(resultCountryList.length);

    // combain all the scraped data
    const data = resultList.map((result, index) => ({ ...result, vpnCountries: resultCountryList[index] }));

    // creating the json file
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) { console.log(err) }
        else { console.log('Saved Successfully!') }
    })
};

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

const name = 'lord of the rings'
scrap(name)

// if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log("app is running on port 5050");
//     convert();
// });
