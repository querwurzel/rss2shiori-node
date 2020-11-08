const process = require('child_process');
const util = require('util');
const xml2js = require('xml2js');
const fs = require('fs');

const shioriPath = 'shiori';
const rssFile = 'bookmarks.rss';

/*

Usage:
  shiori add url [flags]

Flags:
  -e, --excerpt string   Custom excerpt for this bookmark
  -h, --help             help for add
      --log-archival     Log the archival process
  -a, --no-archival      Save bookmark without creating offline archive
  -o, --offline          Save bookmark without fetching data from internet
  -t, --tags strings     Comma-separated tags for this bookmark
  -i, --title string     Custom title for this bookmark

*/
const parser = new xml2js.Parser({ attrkey: 'attributes' });
const xml = fs.readFileSync(rssFile, 'utf8');

parser.parseString(xml, function(error, result) {
    if (error !== null) {
		console.log(error);
		return;
    }

    //console.log(util.inspect(result, false, null));

    let count = 1;
    result.rss.channel.forEach((channel) => {
    	// reverse items for chronological order
		channel.item.reverse().forEach((item) => {
			const link = item.link[0];
			const tags = item.category;
			const title = item.title[0];

			if (!title || !link || !tags || !tags.length) {
				console.log('found strange item:', item);
				return;
			}

			const importer = (call) => {
				process.exec(call, (error, stdout, stderr) => {
					if (error) {
					    console.log(error);
					    return;
					}

					if (stderr) {
						console.log(`stderr: ${stderr}`);
					}

					console.log(`stdout: ${stdout}`);
			    });
			};

			const call = `${shioriPath} add "${link}" --tags "${tags}" --title "${title}" --offline`;

			setTimeout(importer, count * 1200, call);
			count++;
		});
	});
});





