const searchLinkedIn = require('./searchLinkedIn');

test('Will return an object with LinkedIn info from a company', async () => {
  const input = await searchLinkedIn('365Talents');
  const output = 
  {
    companyLogo: "https://media-exp1.licdn.com/dms/image/C4D0BAQEM_bhwh1rcjQ/company-logo_200_200/0/1553619292550?e=1648080000&v=beta&t=yG8RCjTktzifTFj0-6bYHCVQ_AvhwCzYfnarjHKBABE",
    companyName: "365Talents",
    companyEmployeeNumber: "11-50 employees",
    companyLinkedInNumber: "49 employees"
  }
  expect(input).toStrictEqual(output);
}, 25000);