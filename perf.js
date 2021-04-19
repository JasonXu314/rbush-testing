const { RBush3D } = require('rbush-3d');

const tree = new RBush3D();

function rdm(large) {
	return Math.random() * (large ? 1_000_000_000 : 1000);
}

function now() {
	return Date.now();
}

let searchItem;
let searchIndex;

let averageInsert = 0;
const aboveAverage = [];

module.exports = (largeNumbers) => {
	for (let i = 0; i < 1_000_000; i++) {
		const x = rdm(largeNumbers),
			y = rdm(largeNumbers),
			z = rdm(largeNumbers);

		if (rdm() < 1) {
			searchItem = { maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z };
			searchIndex = i;
		}

		const timeStart = now();
		tree.insert({ maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i });
		const timeDelta = now() - timeStart;

		if (timeDelta > averageInsert) {
			aboveAverage.push(i);
		}

		averageInsert = (averageInsert * i + timeDelta) / (i + 1);
	}

	console.log('Insert inserts that increased average:', aboveAverage, `${aboveAverage.length} items`);
	console.log(
		'Number of inserts that increased average in second half',
		aboveAverage.reduce((count, val) => (val > 500_000 ? count + 1 : count), 0)
	);
	console.log(
		'Number of inserts that increased average in final quarter',
		aboveAverage.reduce((count, val) => (val > 750_000 ? count + 1 : count), 0)
	);
	console.log(
		'Number of inserts that increased average in final 10%',
		aboveAverage.reduce((count, val) => (val > 900_000 ? count + 1 : count), 0)
	);

	const areaIdx = Math.round(500_000 + (Math.random() - 0.5) * 1000);
	const allItems = tree.all();
	const { maxX: x, maxY: y, maxZ: z, tag: areaCenterTag } = allItems[areaIdx];
	const manualAreaSearch = [];

	if (!searchIndex || !searchItem) {
		searchIndex = 500_000;
		searchItem = allItems[500_000];
	}

	console.time('loop time');

	for (const { maxX: itemX, maxY: itemY, maxZ: itemZ, tag } of allItems) {
		if (Math.abs(itemX - x) < 5 && Math.abs(itemY - y) < 5 && Math.abs(itemZ - z) < 5) {
			manualAreaSearch.push(tag);
		}
	}

	console.timeEnd('loop time');

	console.time('search, single item');

	const results = tree.search(searchItem);

	console.timeEnd('search, single item');
	console.log(results);
	console.log(searchIndex);

	console.time('search, area');

	const areaSearchResults = tree.search({ maxX: x + 5, minX: x - 5, maxY: y + 5, minY: y - 5, maxZ: z + 5, minZ: z - 5 });

	console.timeEnd('search, area');
	console.log(areaSearchResults);
	console.log(manualAreaSearch);
	console.log('Area Search Center:', areaCenterTag);
};
