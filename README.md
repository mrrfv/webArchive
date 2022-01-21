# webArchive

Crawls websites and saves found URLs to a file.

## Usage

Install Node.js and run `npm install` in `./crawler`.

There are 2 **required** CLI arguments:

- First argument: domain to crawl
- Second argument: path to the file where the URLs should be saved

And 2 **optional** CLI arguments:

- Third argument: connection count limit. Default is `15`
- Fourth argument: redirect count limit. Default is `15`.

For example, if you want to crawl `example.com` and save found URLs to `./test.txt`, run the following command:

```bash
node ./index.js example.com test.txt
```

## Download websites in WARC format after a crawl

Use Wget: `wget --input-file=CHANGE_THIS --warc-file="warc" --force-directories --tries=10`
