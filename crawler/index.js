const Crawler = require('node-html-crawler');
const fs = require('fs');

if (!process.argv[2]) return console.log("Domain not provided as a second argument.");
if (!process.argv[3]) return console.log("File path not provided as a third argument.");

const stream = fs.createWriteStream(process.argv[3], { flags: 'a' });
let stats = {
    crawledPages: 0,
    errors: 0
};

const crawler = new Crawler({
    protocol: 'https:',
    domain: process.argv[2],
    limitForConnections: Number.isInteger(Number(process.argv[3])) ? Number(process.argv[3]) : 15,
    limitForRedirects: Number.isInteger(Number(process.argv[4])) ? Number(process.argv[4]) : 15,
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36', // default header
    },
});

crawler.on('data', data => {
    stats.crawledPages++;
    console.log(`Crawled page ${data.url} (status code ${data.result.statusCode}) - ${stats.crawledPages} total pages crawled, ${stats.errors} errors`);
    stream.write(data.url + '\n');
});
crawler.on('error', error => {
    stats.errors++;
    console.error(error);
});
crawler.on('end', () => {
    console.log('Pages crawled successfully');
    process.exit(0);
});

crawler.crawl();
