const puppeteer = require('puppeteer');

const searchLinkedIn = async (searchQuery) => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ["--disable-setuid-sandbox"],
		'ignoreHTTPSErrors': true
	});

	// Login
	const page = await browser.newPage();
	await page.goto(`https://www.linkedin.com/login/fr`);
	await page.waitForSelector('input[name=session_key]');
	await page.type('#username', process.env.EMAIL)
	await page.type('#password', process.env.PSWD)
	await page.keyboard.press('Enter');
	await page.waitForNavigation();
	// Navigation
	await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${searchQuery}`);
	await page.click('.app-aware-link');
	await page.waitForSelector('.org-page-navigation__item');
	let currentUrl = await page.url();
	await page.goto(`${currentUrl}about`);
	// Scraping
	await page.waitForSelector('.scaffold-layout__main');
	let dataObj = {};
	dataObj['companyLogo'] = await page.$eval('.org-top-card-primary-content__logo', img => img.src);
	dataObj['companyName'] = await page.$eval('h1', el => el.innerText.trim());
  dataObj['companyEmployeeNumber'] = await page.$$eval('dd', elements => {
		const companyEmployeeNumber = elements.find(el => el.innerText.match(/employees/))

		if (!companyEmployeeNumber) {
			return null
		}

		return companyEmployeeNumber.innerText.trim()
	})
  dataObj['companyLinkedInNumber'] = await page.$$eval('dd', elements => {
		const companyLinkedInNumberIndex = elements.find(el => el.innerText.match(/LinkedIn/))

		if (!companyLinkedInNumberIndex) {
			return null
		}

		const match = companyLinkedInNumberIndex.innerText.match(/(\d+)/)

		if (!match) {
			return null
		}

		return match[0]
	})

	await browser.close();
	return dataObj
};

module.exports = searchLinkedIn;