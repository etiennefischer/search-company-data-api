const puppeteer = require('puppeteer');
const cookies = require('./linkedin.com.cookies.json');

const searchLinkedIn = async (searchQuery) => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ["--disable-setuid-sandbox"],
		'ignoreHTTPSErrors': true
	});

	const page = await browser.newPage();
	await page.setCookie(...cookies);
	await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${searchQuery}`);

	await page.click('.app-aware-link');
	await page.waitForSelector('.org-page-navigation__item');
	let currentUrl = await page.url();
	console.log(`Going now to ${currentUrl}about`)
	await page.goto(`${currentUrl}about`);
	// Scraping
	await page.waitForSelector('.scaffold-layout__main');
	let dataObj = {};
	dataObj['companyLogo'] = await page.$eval('.org-top-card-primary-content__logo', img => img.src);
	dataObj['companyName'] = await page.$eval('h1', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim());
	dataObj['companyEmployeeNumber'] = await page.$eval('.text-body-small.t-black--light.mb1', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim());
	dataObj['companyLinkedInNumber'] = await page.$eval('.org-top-card-secondary-content__see-all.t-normal.t-black--light', text => text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim());

	console.log(dataObj);

	await browser.close();

	return dataObj
};

module.exports = searchLinkedIn;

