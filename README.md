# Search Company Data API

This API provides infos on any company with a LinkedIn page.

Data scraped :

- Company Logo
- Company Name
- Company Employees Number Range
- LinkedIn Companies Employees

This project works with Search Company Data front project → https://github.com/etiennefischer/search-company-data-front

## Set up

1. Install dependencies
```
    npm install
```
2. Create an `.env` file in the root directory with your LinkedIn's credentials, the file needs to be formatted this way :

```
EMAIL=youremail@company.com
PSWD=myPassword
```

3. Start the server
```
    npm run start
```

4. Optional

* Headless mode for Puppeteer : 

    In the `searchLinkedIn.js` line 5 you can enable or disable the headless mode
    `headless: false` → show chrome interface

* Testing the Puppeteer script (thanks to Jest) with the `searchLinkedIn.test.js` file :
```
    npm test
```

## Tools used

1. Express → https://expressjs.com/
2. Puppeteer → https://pptr.dev/
3. Jest → https://jestjs.io/

