const puppeteer = require('puppeteer');
// const app = require('express')();
// const fs = require('fs');

// scraping for the key words:

const scrap = async () => {
    //browser initiate
    const browser = await puppeteer.launch({ headless: false });
    // opening a new blank page
    const page = await browser.newPage();
    // navigate to url and wait until page loads completely 
    // await page.goto('https://unogs.com/search/:searchContent', { waitUntil: 'domcontentloaded' });
    await page.goto('https://unogs.com/search/matrix', { waitUntil: 'domcontentloaded' });

    // eval will extract the rows from the table
    import React, {useState} from 'react';

    const SearchBar = () => {
    
        const [searchVal, setSearchVal] = useState("");
    
        const handleSearchInput = (e) => {
            setSearchVal(e.target.value);
        }
    
        const callSearchFunction = (e) => {
            e.preventDefault();
            setSearchVal("");
        }
    
        return ( 
            <form className="search">
            <input
              value={searchVal}
              onChange={handleSearchInput}
              type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
          </form>
        );
    }
     
    export default SearchBar;
        // results.forEach(result => {
            // let record = { imgSrc: '', movieName: '', movieDescription: '', countriesList: [] }
            // const item = result.querySelector('div');
            // record.imgSrc = result.querySelector('img').src;
            // resultList.push(result.className)
            // x = result.className;


            // // saving the rows number
            // let rowNumber = null;

            // if (tdList[0].dataset.lineNumber && !tdList[1].dataset.lineNumber) {
            //     rowNumber = tdList[0].dataset.lineNumber;
            // } else if (tdList[1].dataset.lineNumber && !tdList[0].dataset.lineNumber) {
            //     rowNumber = tdList[1].dataset.lineNumber;
            // } else if (tdList[0].dataset.lineNumber && tdList[1].dataset.lineNumber) {
            //     tdList[0].dataset.lineNumber > tdList[1].dataset.lineNumber ? rowNumber = tdList[0].dataset.lineNumber : rowNumber = tdList[1].dataset.lineNumber
            // }

            // // finding the wanted string and saving both the string and its row number
            // const spanList = tdList[1].querySelectorAll('span');
            // const ToTranslate = [];
            // spanList.forEach((element, index, array) => {
            //     const matchWord = 'function';
            //     if (element.innerText && element.innerText.includes(matchWord)) {
            //         ToTranslate.push(array[index + 1].innerText);
            //     }
            // });

            // if (ToTranslate.length > 0) {
            //     record.Line = rowNumber;
            //     record.TextToTranslate = ToTranslate[0];
            //     rowList.push(record);
            // };
        // });
        // return rowList;
        return itemlist[0].className;
    })
    console.log(recordList);
    browser.close();

    // creating the json file
    // fs.writeFile('scraper-data.json', JSON.stringify(recordList, null, 2), (err) => {
    //     if (err) { console.log(err) }
    //     else { console.log('Saved Successfully!') }
    // })
};
scrap();

// app.listen(5050, () => {
//     console.log("app is running on port 5050");
//     convert();
// });


