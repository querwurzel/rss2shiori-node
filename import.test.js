
const sample = `<?xml version="1.0" encoding="utf-8" ?>
				<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
					<channel>
						<title>Some Feed</title>
						<link>https://example.org/</link>
						<atom:link rel="self" type="application/rss+xml" href="https://example.org/rss"/>
						<description>Some description of some feed</description>
						<pubDate>Sat, 07 Nov 2020 16:32:15 +0100</pubDate>
						<lastBuildDate>Sat, 07 Nov 2020 10:36:02 +0100</lastBuildDate>
						<ttl>60</ttl>
						<item>
							<title>DDD in practice</title>
							<link>https://www.infoq.com/articles/ddd-in-practice/</link>
							<guid>4711</guid>
							<description></description>
							<dc:creator>Max Mustermann</dc:creator>
							<pubDate>Sat, 07 Nov 2020 09:36:02 +0000</pubDate>
							<category>software</category>
							<category>development</category>
							<category>best practice</category>
							<category>ddd</category>
						</item>
					</channel>
				</rss>`;

describe('main', () => {

	beforeEach(() => {
		jest.resetModules();
		jest.useFakeTimers();
		jest.doMock('fs', () => {
			return {
				readFileSync: jest.fn(() => sample)
			}
		});
	})

	test('rss item should result in system call', () => {
		const subProcess = require('child_process');
		jest.mock('child_process', () => {
			return {
				exec: jest.fn()
			}
		})

		const importer = require('./import');

		jest.runAllTimers();

		expect(subProcess.exec).toHaveBeenCalledWith('./shiori add "https://www.infoq.com/articles/ddd-in-practice/" --tags "software,development,best practice,ddd" --title "DDD in practice" --offline', expect.any(Function));
	});
});